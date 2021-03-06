import React, { Component } from 'react';
import BoardView from './BoardView';
import data from './Data';
import { Modal } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DlgAbout from './DlgAbout';
import DlgInput from './DlgInput';
import DlgOkCancel from './DlgOkCancel';

const ipcRenderer = window.require('electron').ipcRenderer; //

export default class AppScrum extends Component {
  constructor() {
    super();
    data.getconfig();
    this.state = {
      boards: data.config.boards,
      class_anim: '',
      show_input: false,
      show_about: false,
      show_ok: false,
    };
    if (ipcRenderer) {
      ipcRenderer.on('request_close', () => {
        data.saveconfig();
        ipcRenderer.send('close');
      });
      ipcRenderer.on('about', () => {
        this.setState({ show_about: true });
      });
      ipcRenderer.on('save', () => {
        data.saveconfig();
        this.anim();
      });
    }
  }
  save=()=>{
    data.saveconfig();this.anim();
  }
  updateValue = e => {
    //console.log(e.target.value);
    this.setState({
      class_anim: e.target.value + ' animated',
    });
    setTimeout(this.check, 1000);
  };
  componentDidMount = () => {
    this.anim();
  };
  anim = () => {
    //console.log(e.target.value);
    this.setState(
      {
        class_anim: 'bounceOutRight animated',
      },
      () => {
        setTimeout(this.check, 1000);
      }
    );
  };
  animationEnd = el => {
    var animations = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'mozAnimationEnd',
      WebkitAnimation: 'webkitAnimationEnd',
    };

    for (var t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
    return;
  };

  check = () => {
    if (this.animationEnd(this.refs.div_anim)) {
      // console.log("end");
      this.setState({ class_anim: '' });
    } else {
      setTimeout(this.check, 1000);
    }
  };
  new_board = () => {
    // console.log("new board");
    // boards=this.state.boards;
    console.log(data);
    // data.boards.push(new Board('aaaaa'));
    this.setState({ show_input: true }); // boards:data.boards});
  };
  clearStage = stage => {
    console.log(this);

    data.clearStage(stage);
    this.setState({ boards: data.config.boards });
  };
  clickBoard = id => {
    console.log(id);
    console.log(this.props);
    this.setState({ activeid: id });
    this.props.history.push('/board/' + id);
  };
  deleteBoard = key => {
    this.idx = key;
    this.setState({ show_ok: true });
  };
  close_input = name => {
    if (name) {
      data.new_Board(name);
      this.setState({ boards: data.config.boards });
    }
    this.setState({ show_input: false });
  };
  close_ok = sure => {
    this.setState({ show_ok: false });
    if (sure) {
      const filteredFoods = data.config.boards.filter(
        (item, idx) => this.idx !== idx
      );
      data.config.boards = filteredFoods;
      this.setState({ boards: data.config.boards });
    }
  };
  render() {
    // console.log("render");
    console.log(this.state);
    // let boarditem_views=this.state.boards.map((item,key)=>{
    //     return(<Tab eventKey={key} key={key} title={item.title}>
    //       <BoardView id={key} />
    //     </Tab>);
    // });
    let boarditem_list = this.state.boards.map((item, key) => {
      return (
        <Tab key={key}>
          <div>
            <span>{item.title}</span>
            <span
              style={{ marginLeft: '30px', cursor: 'default' }}
              onClick={() => {
                this.deleteBoard(key);
              }}
              className="glyphicon glyphicon-remove"
              aria-hidden="true"
            />
          </div>
        </Tab>
      );
    });
    let boarditem_panels = this.state.boards.map((item, key) => {
      let stories = item.stories;
      return (
        <TabPanel key={key} style={{ padding: '0px 10px 10px 10px' }}>
          <BoardView
            index={key}
            clearStage={this.clearStage}
            stories={stories}
          />
        </TabPanel>
      );
    });
    return (
      <div ref="div_anim" className={this.state.class_anim}>
        <div>
          <div id="select-board">
          <button
              onClick={this.save}
              style={{
                float: 'right',
                marginTop: '4px',
                marginBottom: '3px',
                marginLeft: '6px',
                height: '30px',
              }}
              className="btn btn-secondary new"
              href="javascript:void 0"
            >
              保存
            </button>
          <button
              onClick={this.new_board}
              style={{
                float: 'right',
                marginTop: '4px',
                marginBottom: '3px',
                height: '30px',
              }}
              className="btn btn-primary new"
              href="javascript:void 0"
            >
              新建事项板
            </button>
            
          </div>
          <Tabs>
            <TabList ref="tabList">{boarditem_list}</TabList>
            {boarditem_panels}
          </Tabs>
        </div>
        <DlgInput
          showModal={this.state.show_input}
          closeModal={this.close_input}
        />
        <DlgOkCancel
          description="删除事项板"
          showModal={this.state.show_ok}
          closeModal={this.close_ok}
        />
        <DlgAbout
          showModal={this.state.show_about}
          closeModal={() => {
            this.setState({ show_about: false });
          }}
        />
      </div>
    );
  }
}
