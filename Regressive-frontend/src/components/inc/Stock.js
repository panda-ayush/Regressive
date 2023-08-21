import React from 'react';
import Plot from 'react-plotly.js';
import Skeleton from './Skeleton';

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            loading: true
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const pointerToThis = this;
        const API_KEY = 'PFND4WOJ10XQWY8E';
        let StockSymbol = this.props.tkrSymbol;
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunctions = [];
        let stockChartYValuesFunctions = [];

        fetch(API_Call)
            .then(function(response) {
                return response.json();
            })
            .then( function(data) {
                console.log(data);

                for (var key in data['Time Series (Daily)']) {
                    stockChartXValuesFunctions.push(key);
                    stockChartYValuesFunctions.push(data['Time Series (Daily)'][key]['1. open']);
                }

                pointerToThis.setState({
                    stockChartXValues: stockChartXValuesFunctions,
                    stockChartYValues: stockChartYValuesFunctions,
                    loading: false
                });
            })
    }

    render() {
        return (
            <div>
                {this.state.loading ? <Skeleton/> : (
                <Plot
                data={[
                {
                    x: this.state.stockChartXValues,
                    y: this.state.stockChartYValues,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },
                ]}
                layout={ {width: 520, height: 440, title: 'Market Data'} }
            />
            )}
           </div> 
        )
    }
}

export default Stock;
