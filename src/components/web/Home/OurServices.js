import React, {Component} from 'react';
import {Card} from 'antd';

const {Meta} = Card;

export default class OurServices extends Component {
    render() {
        return (
            <div className= "our-services" id="our-services">
                <div className="info-services">
                    <h1>Dịch Vụ</h1>
                    <h3>Công việc quản lý nhà trọ, căn hộ chiếm tỷ lệ không hề nhỏ trong hiệu quả của các chuỗi nhà trọ, căn hộ. Nhưng để quản lý hiệu quả không phải chuyện đơn giản.</h3>
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
