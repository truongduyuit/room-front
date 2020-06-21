import React, {Component} from 'react';
import {Card} from 'antd';

const {Meta} = Card;

export default class OurServices extends Component {
    render() {
        return (
            <div className= "our-services" id="our-services">
                <div className="info-services">
                    <h1>Our Services</h1>
                    <h3>Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed!</h3>
                </div>

                <div className="services">
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </div>
            </div>
        );
    }
}
