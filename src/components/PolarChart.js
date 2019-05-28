import React from "react";
import { Polar } from "react-chartjs-2";
// import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dataPolar: {
        datasets: [
          {
            data: [...this.props.data],
            backgroundColor: [
              'red': '#F64B00',
              'orange': '#F49F00',
              'yellow': '#00B15A',
              'green': '#009598',
              'teal': '#0058A5',
              'blue': '#620794',
              'purple': '#CA0027',
              'darkred': '#EA0000'
            ],
          }
        ],
        labels: [...this.props.labels]
      },
      options: {
				responsive: true,
				legend: {
					position: 'right',
				},
				scale: {
					ticks: {
						beginAtZero: true
					},
					reverse: false
				},
				animation: {
					animateRotate: true,
					animateScale: true
				}
			}
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
    console.log(this.props.data)
    return (
      <div>
        <h3 className="mt-5">Polar area chart</h3>
        <Polar data={this.state.dataPolar} options={this.state.options} />
      </div>
    );
  }
}

export default ChartsPage;