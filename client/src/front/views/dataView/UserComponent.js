import React from 'react';

export class UserComponent extends React.Component {
    constructor() {
        super();
    }

    render () {
        let userNames = this.props.state.userNames;
        let optionItems = userNames.map((userName) =>
                <option key={userName.name}>{userName.name}</option>
            );

        return (
         <div>
             <select className="form-control m-b-10">
                {optionItems}
             </select>
         </div>
        )
    }
}

export default UserComponent;