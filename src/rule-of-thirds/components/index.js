import React from 'react';
import '../styles/main.scss';
import fire from './fire';




class RuleOfThirds extends React.Component {



constructor(props) {
super(props);
this.dimensions = React.createRef()
this.state = {
object : [],
base64: [],

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
}






uploadToDataBase() {
    // var name = this.state.imageProps.name.split('.').slice(0, -1).join('.');

    // fire.database().ref('Pictures/' +  name).update({
    //     Downloads: this.state.downloadvalue,
    //     Views: this.state.viewvalue,
    //     DistanceToPointA: this.state.DistanceToPointA,
    //     DistanceToPointB: this.state.DistanceToPointB,
    //     DistanceToPointC: this.state.DistanceToPointC,
    //     DistanceToPointD: this.state.DistanceToPointD,
    //     Height: this.state.height,
    //     Width: this.state.width,
    //   });
}

render() {
    
return (
    
<div className="sharpness">
    <div className="sharpness__image">

        
    <img ref={this.dimensions} src={this.state.base64} />
    </div>


    <br />
    <input className="filetest" type="file" onChange={(e)=> {
    this.uploadImage(e);
    }} />

</div>
)};

};

export default RuleOfThirds;