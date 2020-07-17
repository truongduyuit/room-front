import React, {Component} from 'react';
import {Carousel, Avatar, Rate} from 'antd';

export default class RateUser extends Component {
    render() {
        return (
            <div className="rate" id="rate">
                <div className="info-rate">
                    <h1>Khách hàng nói gì </h1>
                    <br />
                    <h5>
                        Sự hài lòng của khách hàng là động lực để chúng tôi cải thiện phần mềm và mở ra cơ hội cho nhiều khách hàng mới hơn trong tương lai. Do đó, chúng tôi rất coi trọng phản hồi của khách hàng và nỗ lực để tận dụng tốt nhất những phản hồi đó.
                    </h5>
                </div>

                <div className= "rates">
                    <Carousel autoplay>
                        <div>
                            <div className="rate-slide">
                                <h3>“Phần mềm giúp tôi quản lý người thuê, hợp đồng và hóa đơn hàng tháng rất dễ dàng.”</h3>
                                <br />
                                <hr />
                                <br />
                                <div className="rate-star">
                                    <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <div>
                                        <b>Anh Nguyễn Văn Thành</b>
                                        <div>Chủ trọ</div>
                                    </div>
                                    <Rate disabled defaultValue={5} />
                                </div>
                            </div>
                            
                        </div>
                        <div>
                            <div className="rate-slide">
                                <h3>“Kể từ khi sử dụng phần mềm, việc quản lý nhà trọ của tôi trở nên đơn giản hơn nhiều.”</h3>
                                <br />
                                <hr />
                                <br />
                                <div className="rate-star">
                                    <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <div>
                                        <b>Chị Lê Thị Hạnh</b>
                                        <div>Chủ trọ</div>
                                    </div>
                                    <Rate disabled defaultValue={5} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="rate-slide">
                                <h3>“Giao diện thân thiện và rất dễ sử dụng, nhiều tính năng hữu ích, phù hợp với mọi chủ trọ.”</h3>
                                <br />
                                <hr />
                                <br />
                                <div className="rate-star">
                                    <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <div>
                                        <b>Anh Nguyễn Văn Thành</b>
                                        <div>Chủ trọ</div>
                                    </div>
                                    <Rate disabled defaultValue={5} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="rate-slide">
                                <h3>“Phần mềm giúp mình quản lý khách thuê, hợp đồng và hóa đơn hàng tháng rất dễ dàng.”</h3>
                                <br />
                                <hr />
                                <br />
                                <div className="rate-star">
                                    <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <div>
                                        <b>Bác Phạm Thị Cúc</b>
                                        <div>Chủ trọ</div>
                                    </div>
                                    <Rate disabled defaultValue={5} />
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        );
    }
}
