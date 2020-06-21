import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import OurServices from './Home/OurServices';
import Rate from './Home/RateUser';
import Team from './Home/Team';
import Footer from './Footer';

export default class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <header>
                    <div className="main-head">
                        {/* <div class="logo">
				<img src="./logo_transparent.png" alt="H.D.V Smart Motel">
			</div> */}
                        <ul>
                            <li className="activeWeb"><a href="#">Home</a></li>
                            <li><a href="#our-services">Services</a></li>
                            <li><a href="#rate">Rate</a></li>
                            <li><a href="#our-team">Team</a></li>
                            <li><Link to="/dang-nhap">Free Trial</Link></li>
                        </ul>
                    </div>
                    <div className="title">
                        <h1>H.D.V Smart Motel</h1>
                        <h3>Easy - Smart - Convenient</h3>
                    </div>
                    <div className="trial">
                        <Link to="/dang-nhap" className="btn-trial">Free Trial</Link>
                    </div>
                </header>
                <OurServices />
                <Rate />
                <Team />
                <Footer />
            </React.Fragment>
        );
    }
}
