import React, { Component } from 'react';
import People from "./people"

class Peoples extends Component {
    render() {
        const {length,data} = this.props
        return (
            <ul className={"peoples len-"+length}>
                {data.map((people, key) => (
                    <li key={key} style={
                        {
                            transform: 'translateX(-'+(key * 25)+'px)',
                            zIndex: (data.length - key)
                        }
                    }>
                        <People data={people} hasSiblings={length > 1}/>
                    </li>
                ))}
            </ul>
);
    }
}

export default Peoples;