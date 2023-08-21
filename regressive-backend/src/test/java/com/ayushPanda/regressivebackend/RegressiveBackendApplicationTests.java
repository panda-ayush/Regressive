package com.ayushPanda.regressivebackend;

import com.ayushPanda.regressivebackend.controller.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class RegressiveBackendApplicationTests extends UserController {
	@Test
	public static void main(String[] args) throws IOException {
		realTimePrice("AAPL");
		realTimePrice("GOOGL");
		System.out.println("####################################");
		pricePrediction("TSLA");
		convertDate("Jul 19, 2023");
		System.out.println("####################################");
		System.out.println(findPreviousSearch("TSLA"));
	}



}
