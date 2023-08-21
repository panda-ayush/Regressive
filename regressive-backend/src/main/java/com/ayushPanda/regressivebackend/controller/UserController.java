package com.ayushPanda.regressivebackend.controller;

import com.ayushPanda.regressivebackend.exception.UserNotFoundException;
import com.ayushPanda.regressivebackend.model.User;
import com.ayushPanda.regressivebackend.repository.userRepository;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.apache.commons.math3.stat.regression.SimpleRegression;

import java.io.IOException;
import java.sql.*;

import java.util.Map;
import java.util.TreeMap;
import java.util.SortedMap;
import java.util.List;

import java.time.format.DateTimeFormatter;
import java.time.LocalDate;


import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;


@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    private static String currentDate () {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        LocalDate current = LocalDate.now();

        return (current.format(formatter));
    }

    public static double realTimePrice(String name) throws IOException {
        final String url = "https://finance.yahoo.com/quote/" + name;
        try {
            final Document document = Jsoup.connect(url).get();
            Elements div = document.select("fin-streamer.Fw\\(b\\).Fz\\(36px\\).Mb\\(-4px\\).D\\(ib\\)");
            String priceText = div.text();
            double currentPrice = Double.parseDouble(priceText);
            return currentPrice;
        } catch (IOException e) {
            return 0.0;
        }
    }

    public static String convertDate (String oldDate) {

        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("MMM d, yyyy"); //Parse the date string
        LocalDate date = LocalDate.parse(oldDate, inputFormatter);

        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        String newDate = date.format(outputFormatter);

        return newDate;

    }

    public static SortedMap<String, Double> findPreviousSearch (String tkrName) {
        SortedMap <String, Double> previousPrediction = new TreeMap<>();

        try {
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/regressive?autoReconnect=true&useSSL=false", "root", "");
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM user");

            while (resultSet.next()) {
                String name = resultSet.getString("tkr_symbol");
                String date = resultSet.getString("date");
                Double prediction = Double.parseDouble(resultSet.getString("estimated_price"));

                if (tkrName.equals(name)) {
                    previousPrediction.put(date, prediction);
                }
            }

            resultSet.close();
            statement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return previousPrediction;
    }

    public static double predictionDifference (SortedMap<String, Double> data, SortedMap<String, Double> history) {
        int counter = 1;
        double sum = 0;

        for (Map.Entry<String, Double> entry: history.entrySet()) {

            if (data.containsKey(entry.getKey())) {
                double value = data.get(entry.getKey());
                value = (-1)*(entry.getValue() - value);
                sum += value;
                counter++;
            }
            else {
                continue;
            }
        }

        return ((sum/counter));
    }



    public static double calculatePrice (SortedMap<String, Double> data, SortedMap<String, Double> history) {
        SimpleRegression regression = new SimpleRegression();
        int[] counter = {1};

        data.forEach((key, value) -> {
            regression.addData(new double[][]{
                    {counter[0], value}
            });
            counter[0]++;
        });
        double predictedValue = regression.predict(counter[0]);

        if (history.isEmpty()) {
            double calculation = Math.round((predictedValue) * 100.0) / 100.0;
            return calculation;
        }
        else {
            double calculation = Math.round((predictedValue + (predictionDifference(data, history))) * 100.0) / 100.0;
            return (calculation);
        }
    }

    public static double pricePrediction(String name) throws IOException {
        final String url = "https://finance.yahoo.com/quote/" + name + "/history?p=" + name;
        SortedMap<String, Double> webScrapeData = new TreeMap<>();
        SortedMap <String, Double> previousPrediction = new TreeMap<>();
        try {
            final Document document = Jsoup.connect(url).get();
            Elements table = document.select("table");
            Elements tableRows = table.select("tr");

            for (Element row: tableRows) {
                Elements tableColumns = row.select("td");
                if (tableColumns.size() > 4) {
                    String date = convertDate(tableColumns.get(0).text());
                    double historyPrice = Double.parseDouble(tableColumns.get(4).text());

                    webScrapeData.put(date, historyPrice);
                }
            }

            previousPrediction = findPreviousSearch(name);

            return (calculatePrice(webScrapeData, previousPrediction));


        } catch (IOException e) {
            return 0.0;
        }
    }



    @Autowired
    private userRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) throws IOException {
        if (newUser.getCurrentPrice() == 0.0) {
            newUser.setCurrentPrice(realTimePrice(newUser.getTkrSymbol()));
        }
        if (newUser.getEstimatedPrice() == 0.0) {
            newUser.setEstimatedPrice(pricePrediction(newUser.getTkrSymbol()));
        }
        if (newUser.getDate() == null) {
            newUser.setDate(currentDate());
        }
        newUser.setId(newUser.getId());
        newUser.setTkrSymbol(newUser.getTkrSymbol());
        return userRepository.save(newUser);
    }



    @GetMapping("/users")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
        User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) throws IOException {
        return userRepository.findById(id).map(user -> {
            user.setTkrSymbol(newUser.getTkrSymbol());
            if (newUser.getDate() == null) {
                user.setDate(currentDate());
            }
            if (newUser.getCurrentPrice() == 0.0) {
                try {
                    user.setCurrentPrice(realTimePrice(newUser.getTkrSymbol()));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            if (newUser.getEstimatedPrice() == 0.0) {
                try {
                    user.setEstimatedPrice(pricePrediction(newUser.getTkrSymbol()));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            return userRepository.save(user);
        }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        if(!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "TKR Symbol with id " +id+ " has been deleted,";
    }

}
