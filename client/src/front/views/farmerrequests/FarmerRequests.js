// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { AnimatedView, Panel } from '../../components';

class FarmerRequests extends PureComponent {
  render() {
    return (
      <AnimatedView>
        <div className="row">
          <div className="col-xs-12">
            <div className="panel">
              <header className="panel-heading">Farmer Requests</header>
              <div className="panel-body table-responsive">
                <div className="box-tools m-b-15">
                  <div className="input-group">
                    <input
                      type="text"
                      name="table_search"
                      className="form-control input-sm pull-right"
                      style={{ width: '150px' }}
                      placeholder="Search"
                    />
                    <div className="input-group-btn">
                      <button className="btn btn-sm btn-default">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Zip Code</th>
                      <th>Number of nodes</th>
                      <th>New Cluster</th>
                      <th>Location</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>183</td>
                      <td>John Doe</td>
                      <td>11-7-2014</td>
                      <td>
                        <span className="label label-success">Approved</span>
                      </td>
                      <td>
                        Bacon ipsum dolor sit amet salami venison chicken flank
                        fatback doner.
                      </td>
                    </tr>
                    <tr>
                      <td>219</td>
                      <td>Jane Doe</td>
                      <td>11-7-2014</td>
                      <td>
                        <span className="label label-warning">Pending</span>
                      </td>
                      <td>
                        Bacon ipsum dolor sit amet salami venison chicken flank
                        fatback doner.
                      </td>
                    </tr>
                    <tr>
                      <td>657</td>
                      <td>Bob Doe</td>
                      <td>11-7-2014</td>
                      <td>
                        <span className="label label-primary">Approved</span>
                      </td>
                      <td>
                        Bacon ipsum dolor sit amet salami venison chicken flank
                        fatback doner.
                      </td>
                    </tr>
                    <tr>
                      <td>175</td>
                      <td>Mike Doe</td>
                      <td>11-7-2014</td>
                      <td>
                        <span className="label label-danger">Denied</span>
                      </td>
                      <td>
                        Bacon ipsum dolor sit amet salami venison chicken flank
                        fatback doner.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

export default FarmerRequests;
