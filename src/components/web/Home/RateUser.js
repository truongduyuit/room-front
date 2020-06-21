import React, {Component} from 'react';
import {Carousel, Avatar, Rate} from 'antd';

export default class RateUser extends Component {
    render() {
        return (
            <div className="rate" id="rate">
                <div className="info-rate">
                    <h1>What Clients Says About Us</h1>
                    <br />
                    <h3>
                        Duis et metus et massa tempus lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies, orci molestie blandit interdum.

ipsum ante pellentesque nisl, eget mollis turpis quam nec eros. ultricies, orci molestie blandit interdum.
                    </h3>
                </div>

                <div className= "rates">
                    <Carousel autoplay>
                        <div>
                            <div className="rate-slide">
                                <h3>“Praesent scelerisque, odio eu fermentum malesuada, nisi arcu volutpat nisl, sit amet convallis nunc turp.”</h3>
                                <br />
                                <hr />
                                <br />
                                <div className="rate-star">
                                    <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <strong>Mr. Johnson</strong>
                                    <Rate disabled defaultValue={5} />
                                </div>
                            </div>
                            
                        </div>
                        <div>
                            <div className="rate-slide">
                                <h3>“Praesent scelerisque, odio eu fermentum malesuada, nisi arcu volutpat nisl, sit amet convallis nunc turp.”</h3>
                                <br />
                                <hr />
                                <br />
                                <div className="rate-star">
                                    <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <strong>Mr. Johnson</strong>
                                    <Rate disabled defaultValue={5} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="rate-slide">
                                <h3>“Praesent scelerisque, odio eu fermentum malesuada, nisi arcu volutpat nisl, sit amet convallis nunc turp.”</h3>
                                <br />
                                <hr />
                                <br />
                                <div className="rate-star">
                                    <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <div>
                                        <b>Mr. Johnson</b>
                                        <div>U.S.A</div>
                                    </div>
                                    <Rate disabled defaultValue={5} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="rate-slide">
                                <h3>“Praesent scelerisque, odio eu fermentum malesuada, nisi arcu volutpat nisl, sit amet convallis nunc turp.”</h3>
                                <br />
                                <hr />
                                <br />
                                <div className="rate-star">
                                    <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <strong>Mr. Johnson</strong>
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
