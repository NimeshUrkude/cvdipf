import {useRef, useState } from "react";
import "./appstyle.css"
import * as tf from '@tensorflow/tfjs';


function App() {

  const [fmodel,setfmodel]=useState(null);
  const [fimg,setfimg]=useState(null);
  const [fans,setfans]=useState(null);
  const ii = useRef()

  const catchimg = async(e)=>{
    const modell = await tf.loadLayersModel("https://raw.githubusercontent.com/NimeshUrkude/Cat_vs_Dog_Image_Prediction_Model/main/model.json")
    setfmodel(modell);

    setfimg((URL.createObjectURL(e.target.files[0])));
  }
  
  const search = async()=>{
    const tensor = tf.browser.fromPixels(ii.current);
    const reshape = tf.image.resizeBilinear(tensor ,[224,224])
    const expand = tf.expandDims(reshape, 0)
    const prediction = fmodel.predict(expand);
    const ansnum = prediction.argMax(-1).dataSync()[0];
    switch(ansnum) {
      case 0:
        setfans("Cat");
        break;
      case 1:
        setfans("Dog");
        break;
      default:
        setfans("IDK");
    }

  }

  return (
    <>
    <div className="app-div row">
        <div className="col-sm-12 col-md-6 col-lg-6 p-0">
          <div className="app-bubble">
            <div className="app-bubble-inner">
              <p>Image Prediction Model of Cat or Dog On Tensorflow</p>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 p-0">
          <div className="app-forms">
            <div className="app-forms-inner">
              <input accept="image/" onChange={catchimg} type="file" name="file" id="file" className="inputfile" />
              <label className="space btnw btn btn-dark" htmlFor="file">Choose a Image</label>
              {(fimg)?<img className="space img" alt="img" src={fimg} ref={ii}/>:""}
              <button className="space btnw btn btn-dark" onClick={search}>Btn</button>
              <p className="space result">{fans}</p>
            </div>
          </div>
        </div>
    </div>
    <div className="app-footer">
      Thank You For visiting
    </div>
    </>
  );

}

export default App;
