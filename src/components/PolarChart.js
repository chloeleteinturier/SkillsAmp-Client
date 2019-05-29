import React from "react";
import { Polar, Chart } from "react-chartjs-2";
// import { MDBContainer } from "mdbreact";

class PolarChart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dataPolar: {
        datasets: [
          {
            data: [...this.props.data],
            backgroundColor: [
              Chart.helpers.color('#FF0000').alpha(0.7).rgbString(),
              Chart.helpers.color('#FF5D00').alpha(0.7).rgbString(),
              Chart.helpers.color('#FFCE00').alpha(0.7).rgbString(),
              Chart.helpers.color('#00B15A').alpha(0.7).rgbString(),
              Chart.helpers.color('#009598').alpha(0.7).rgbString(),
              Chart.helpers.color('#0058A5').alpha(0.7).rgbString(),
              Chart.helpers.color('#620794').alpha(0.7).rgbString(),
              Chart.helpers.color('#CA0091').alpha(0.7).rgbString(),
            ],
            hoverBackgroundColor: [
              '#FF0000',
              '#FF5D00',
              '#FFCE00',
              '#00B15A',
              '#009598',
              '#0058A5',
              '#620794',
              '#CA0091'
            ],
          }
        ],
        labels: [...this.props.labels]
      },
      options: {
				responsive: true,
				legend: {
					display : false,
				},
				scale: {
					ticks: {
						beginAtZero: true,
          	min: 0,
						max: 4,
						suggestedMin: 0,
						suggestedMax: 4,
						stepSize: 1
					},
					pointLabels: {
						fontSize: 14,
						fontColor: '#212121',
            fontFamily: 'Nunito',
						display: true,
					},
					reverse: false
				},
				animation: {
					animateRotate: true,
					animateScale: true
        },       
      },
    data:this.props.data,
    labels:this.props.labels
    }
  }



  // componentDidMount(){
  //   const {data} = this.props
  //   console.log(data)
  //   const {dataPolar} = this.state
  //   const dataPolarCopy = dataPolar
  //   console.log(dataPolarCopy.datasets[0].data)
  //   dataPolarCopy.datasets[0].data = data
  //   console.log(dataPolarCopy)
  //   console.log(dataPolarCopy.datasets[0].data)
  //   // this.setState({ dataPolar: dataPolarCopy});
  // }

  render() {
    console.log('data', this.props.data)
    console.log('labels', this.props.labels)
    console.log(this.state.dataPolar)
    return (
      <div>
        <Polar data={this.state.dataPolar} options={this.state.options} />
      </div>
    );
  }
}

export default PolarChart;