import React, { Component } from 'react'
import imageCompression from 'browser-image-compression';
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

export default class ImageCompressor extends Component {
  constructor() {
    super();
    this.state = {
      compressedLink:"",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false
    };
  }

  handleImage = (e) => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true
    });
  };

  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
      useWebWorker: true
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Bring a bigger image");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    return (
      <div>
        <div className="m-5">
          <div className="text-light text-center">
            <h1>Image Compressor</h1>
            <h4>Upload Image</h4>
            <h4>Click on Compressor</h4>
            <h4>Dowload Compressed Image</h4>
            
          </div>

          <div className="row mt-5">
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <Card style={{ width: '22rem' }}>
              {this.state.uploadImage ? (
                <Card.Img
                  className="ht"
                  variant="top"
                  src={this.state.originalLink}
                ></Card.Img>
              ) : (
                <Card.Body>
                  <Card.Text>
                    <FontAwesomeIcon icon={faCloudArrowUp} size="10x" />
                  </Card.Text>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2 btn btn-dark w-75"
                    onChange={e => this.handleImage(e)}
                  />
                </Card.Body>
              )}
              </Card>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
              <br />
              <Card style={{ width: '10rem' }}>
              {this.state.outputFileName ? (
                <button
                  type="button"
                  className=" btn btn-dark"
                  onClick={e => this.handleClick(e)}
                >
                  Compress
                </button>
              ) : (
                <></>
              )}
              </Card>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card style={{ width: '20rem' }}>
              <Card.Body>
              {this.state.clicked ?
              (
                <>
                <Card.Img variant='top' src={this.state.compressedLink}></Card.Img>
                <div className="d-flex justify-content-center">
                  <a
                    href={this.state.compressedLink}
                    download={this.state.outputFileName}
                    className="mt-2 btn btn-dark w-75"
                  >
                    Download
                  </a>
                </div>
                </>
              ) : (
                <>
                <Card.Text>
                    <FontAwesomeIcon icon={faCloudArrowUp} size="10x" />
                </Card.Text>
                </>
              )}
              </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
