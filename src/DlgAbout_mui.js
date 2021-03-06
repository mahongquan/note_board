import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import data from './Data';
var { shell } = window.require('electron'); //
export default class App extends React.Component {
  onClick = () => {
    shell.openExternal(data.config.website);
  };
  render = () => {
    return (
      <Dialog open={this.props.showModal} onClose={this.props.closeModal}>
        <DialogTitle>关于便帖薄</DialogTitle>
        <DialogContent>
          <table>
            <tbody>
              <tr>
                <td>
                  <div
                    style={{
                      display: 'flex',
                      marginRight: '10px',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    版本:
                  </div>
                </td>
                <td>{data.config.version}</td>
              </tr>
              <tr>
                <td
                  style={{
                    display: 'flex',
                    marginRight: '10px',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  作者:
                </td>
                <td>{data.config.author.name}</td>
              </tr>
              <tr>
                <td
                  style={{
                    display: 'flex',
                    marginRight: '10px',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  电子邮箱:
                </td>
                <td>{data.config.author.email}</td>
              </tr>
              <tr>
                <td
                  style={{
                    display: 'flex',
                    marginRight: '10px',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  网站:
                </td>
                <td>
                  <a onClick={this.onClick}>{data.config.website}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={this.props.closeModal}>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}
