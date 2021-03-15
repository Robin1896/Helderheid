import React from 'react';
import '../styles/main.scss';
// import fire from './fire';

class Brightness extends React.Component {

  constructor(props) {
  super(props);
  this.imageRef = React.createRef()
  this.canvasRef = React.createRef()
    this.state = {
      object : [],
      base64: [],
      width: [],
      height: [],
      brightness: [],
    };
  }

  convertBase64 = (file) => {
    return new Promise((resolve, reject) =>{
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
        fileReader.onload = (()=> {
          resolve(fileReader.result);
        });
        fileReader.onerror = ((error) => {
          reject(error);
        });
    });
  };

  uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await this.convertBase64(file);
    this.setState({base64: base64, imageProps: file});
    this.getImageBrightness();
  }

  getImageBrightness() {
      const canvas = this.canvasRef.current
      var colorSum = 0;
      const image = this.imageRef.current
      const ctx = canvas.getContext("2d")

      image.onload = () => {
        this.setState({width: image.width, height: image.height});
        ctx.drawImage(image, 0, 0, this.state.width, this.state.height)
        var imageData = ctx.getImageData(0,0,this.state.width,this.state.height);
        var data = imageData.data;
        var r,g,b,avg;

        for(var x = 0, len = data.length; x < len; x+=4) {
          r = data[x];
          g = data[x+1];
          b = data[x+2];
          avg = Math.floor((r+g+b)/3);
          colorSum += avg;
        }
        
        var brightness = Math.floor(colorSum / (canvas.width*canvas.height));

        if(brightness > 128){
            brightness = ((brightness * 100)/128 )-100
            this.setState({brightness: brightness}); 
            console.log("afbeelding mag wat donkerder")
        } else if (brightness < 128){ 
            brightness = (brightness * 100)/128
            this.setState({brightness: brightness}); 
            console.log("afbeelding mag wat lichter")
        }

      }         
  }

render() {
    
  return (
    <div className="brightness">
      <div className="brightness__image">
        <canvas ref={this.canvasRef} width={this.state.width} height={this.state.height}/>
        <img ref={this.imageRef} src={this.state.base64} alt="afbeelding" />
        <div>Helderheid:{this.state.brightness} %</div>
      </div>
      <br />
      <input className="filetest" type="file" onChange={(e)=> {this.uploadImage(e);}} />
    </div>
  )};
};

export default Brightness;