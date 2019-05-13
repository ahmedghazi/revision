import React, { Component } from 'react';

class Sponsor extends Component {
    render() {
        const {
            data
        } = this.props

        return (
            <div className="sponsor">
                {data.image !== null &&
                    <figure>
                        <img 
                        src={data.image.file.url+"?fit=thumb&f=center&h=40&w=40&r=20"} 
                        alt={data.image.file.fileName} />
                    </figure>
                }
                {/* <div className="info fxs">
                    <div className="name fxs">{data.name}</div>
                    {data.info !== "" &&
                        <div className="info ">
                            {data.info}
                        </div>
                    }  
                </div> */}
                
            </div>
        );
    }
}

export default Sponsor;