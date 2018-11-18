// Anthony Ilersich
// Evelyn Law
// Lilian Chen
// Aaron Kong

import React, { Component } from 'react';
import "./TeamPageStyle.css";
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { Jumbotron } from 'reactstrap';

class TeamPage extends Component {
    render() {
        return (
			<div id="teamPage">
			<div><h1>OUR TEAM</h1></div>
                <div className='flex-container-tab'>
                <h3>Anthony Ilersich</h3>
                <h3>Evelyn Law</h3>
                <h3>Lilian Chen</h3>
                <h3>Aaron Kong</h3></div>
                <div className='flex-container-tab'>
                    <img src="https://media.licdn.com/dms/image/C4D03AQEB4FgkftyT4w/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=Um1gb1qGlvt9krAHmIc2OANL23UxJn34igAXu8eOCBY"
                    alt="Tony Ilersich" width="250" height="250" ></img>
                    <img src="https://media.licdn.com/dms/image/C5603AQGJVUPHZ2I5Gg/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=_TgxfN845S-CYw_NJ9IMOe0YGiTf7vErq3OtHABUqQM"
                    alt="Evelyn Law" width="250" height="250" ></img>
                    <img src="https://media.licdn.com/dms/image/C5603AQHcWW8Hwxw_Eg/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=kpP9WMRjl7UWRUABCoWJuZxefm4n6AdzcIgD_uRYtec"
                    alt="Lilian Chen" width="250" height="250" ></img>
                    <img src="https://media.licdn.com/dms/image/C4D03AQHC3yZ96d1dGA/profile-displayphoto-shrink_200_200/0?e=1548288000&v=beta&t=x0FvdAa8KkN2orLChcYNyIvq3Xpb6gqGeXcC_VRipfw"
                    alt="Aaron Kong" width="250" height="250" ></img>
                        </div>
			</div>

		)
	}
}

export default TeamPage;