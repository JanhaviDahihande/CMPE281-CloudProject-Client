// @flow

/* eslint no-process-env:0 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/privateRoute/PrivateRoute';
import HomeConnected from '../views/home';
import AlertConnected from '../views/alert';
import BasicElementsConnected from '../views/basicElements';
import BasicProgressBarConnected from '../views/basicProgressBar';
import BreadcrumbViewConnected from '../views/breadcrumb';
import EarningGraphConnected from '../views/earningGraph';
import GeneralConnected from '../views/general';
import NotificationsConnected from '../views/notifications';
import PaginationViewConnected from '../views/pagination';
import SimpleTablesConnected from '../views/simpleTables';
import StatViewConnected from '../views/stat';
import StatsCardConnected from '../views/statsCard';
import StripedProgressBarConnected from '../views/stripedProgressBar';
import TabPanelConnected from '../views/tabPanel';
import TeamMatesViewConnected from '../views/teamMates';
import TodoListViewConnected from '../views/todoList';
import TwitterFeedConnected from '../views/twitterFeed';
import WorkProgressConnected from '../views/workProgress';
import ProtectedConnected from '../views/protected';
import BillingUserConnected from '../views/billinguser';
import BillingAdminConnected from '../views/billingadmin';
import ManageClusterConnected from '../views/managecluster';
import ManageNodeConnected from '../views/managenode';
import ManageSensorConnected from '../views/managesensor';
import HomeUserConnected from '../views/homeuser';

export const MainRoutes = () => (
  <Switch>
    <Route exact path="/" component={HomeConnected} />
    <Route exact path="/home" component={HomeUserConnected} />

    <Route path="/Dashboard/statsCard" component={StatsCardConnected} />
    <Route path="/Dashboard/earningGraph" component={EarningGraphConnected} />
    <Route path="/Dashboard/notifications" component={NotificationsConnected} />
    <Route path="/Dashboard/workProgress" component={WorkProgressConnected} />
    <Route path="/Dashboard/twitterFeed" component={TwitterFeedConnected} />
    <Route path="/Dashboard/teamMates" component={TeamMatesViewConnected} />
    <Route path="/Dashboard/todoList" component={TodoListViewConnected} />
    <Route path="/Dashboard/billinguser" component={BillingUserConnected} />
    <Route path="/Dashboard/billingadmin" component={BillingAdminConnected} />

    <Route path="/managecluster" component={ManageClusterConnected} />
    <Route path="/managenode" component={ManageNodeConnected} />
    <Route path="/managesensor" component={ManageSensorConnected} />

    <Route exact path="/simpleTables" component={SimpleTablesConnected} />

    <Route exact path="/basicElements" component={BasicElementsConnected} />

    <Route exact path="/general" component={GeneralConnected} />
    <Route path="/general/breadcrumb" component={BreadcrumbViewConnected} />
    <Route path="/general/stat" component={StatViewConnected} />
    <Route
      path="/general/basicProgressBars"
      component={BasicProgressBarConnected}
    />
    <Route path="/general/tabPanels" component={TabPanelConnected} />
    <Route
      path="/general/stripedProgressBars"
      component={StripedProgressBarConnected}
    />
    <Route path="/general/alerts" component={AlertConnected} />
    <Route path="/general/pagination" component={PaginationViewConnected} />

    {/* private views: need user to be authenticated */}
    <PrivateRoute path="/protected" component={ProtectedConnected} />

    <Route path="/" component={HomeConnected} />
  </Switch>
);

export default MainRoutes;
