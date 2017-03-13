import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const Dashboard = () => {
    return (
        <Card style={{ margin: '2em' }}>
            <CardHeader title="Welcome to the administration"
                        actAsExpander={true}
                        showExpandableButton={true}
                        avatar="http://i.cdn.turner.com/nba/nba/.element/media/2.0/teamsites/bucks/150409-logo-partial-2.svg"/>
            <CardText>Lorem ipsum sic dolor amet...</CardText>
            <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
        </Card>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
