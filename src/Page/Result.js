import React, { Component } from 'react';
import { Jumbotron, Container, Table } from 'reactstrap';
import { Link } from "react-router-dom";
import '../App.css';

class Result extends Component {
  render() {
    return (
      <div className='container'>
        <h2 className="display-4">CFM Hackathon 2018 Result</h2>
        <Table dark striped bordered>
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Compound Return (Nov. 1 - Nov. 21)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Team 1</th>
                    <td>0.05%</td>
                </tr>
                <tr>
                    <th scope="row">Team 2</th>
                    <td>0.11%</td>
                </tr>
                <tr>
                    <th scope="row">Team 3</th>
                    <td>1.47%</td>
                </tr>
                <tr>
                    <th scope="row">Team 8</th>
                    <td>3.96%</td>
                </tr>
            </tbody>
        </Table>
        
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Team 1</th>
                    <th></th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ticker</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>CSU.TO</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>CM.TO</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>CP.TO</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>CTC-A.TO</td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>RY.TO</td>
                </tr>
            </tbody>
        </Table>
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Team 2</th>
                    <th></th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ticker</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>SJR-B.TO</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>SNC.TO</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>BHC.TO</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>DOL.TO</td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>GIL.TO</td>
                </tr>
            </tbody>
        </Table>
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Team 3</th>
                    <th></th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ticker</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>ABX.TO</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>AEM.TO</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>ATD-B.TO</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>BAM-A.TO</td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>BB.TO</td>
                </tr>
            </tbody>
        </Table>
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Team 8</th>
                    <th></th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ticker</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>SJR-B.TO</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>AEM.TO</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>FNV.TO</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>ATD-B.TO</td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>SU.TO</td>
                </tr>
            </tbody>
        </Table>
      </div>
    )
  }
}
export default Result;
