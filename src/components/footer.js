import React, { Component } from 'react';

class Footer extends Component {
    render() {
        //const {data} = this.props
        return (
            <footer>
                <ul className="legals small">
                    <li>
                        <a 
                            href="https://www.notion.so/revisionio/LEGAL-DISCLOSURE-6a2e89e5b0ff494ca40ef250871530de?fbclid=IwAR0Vt9QjfSkqW0wlpOupuupHNRLXEOy9krvFG2ump32uU_ZlWB-rXZhVJOE"
                            target="_blank"
                            rel="noopener noreferrer">Legal</a>
                    </li>
                    <li>
                        <a 
                            href="https://www.notion.so/revisionio/PRIVACY-POLICY-b24ee8d7bd4e477e9750a67833fcf9a1?fbclid=IwAR1jXGSLXQnrEaT5_aoQP_Lo9DY2HY8q9Mk8i-UvXpEZn4xJyKh8j3btRXE"
                            target="_blank"
                            rel="noopener noreferrer">Privacy</a>
                    </li>
                </ul>
                <div className="copy">©2019 Revision.io</div>

            </footer>
        );
    }
}

export default Footer;