import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import request from "superagent-bluebird-promise";
import moment from "moment";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
// components
import AvatarText from "../../../components/common/Avatar/AvatarText";
import Button from "../../../components/common/button/Button";
import Tab from "../../../components/common/form/Tab";
import InputConFirm from "../../../components/common/dialog/InputConFirm";
import CommonSelect from "../../../components/member/data/CommonSelect";
import Title from "../../../components/common/title/Title";
// utils
import { genderFilter } from "../../../util/member/genderFilter";
// const
import { CREATE_MEMBER_ID } from "../../../const/member";
import { apiUrl } from "../../../config";
// toast
import { toast } from "../../../components/common/toast/PubSubToast";
// actions
import actions from "./actions";
// selector
import selectors from "./selectors";

export default connect(
  selectors,
  actions
)(class extends Component {
  constructor(props) {
    super(props);
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
  }
  state = {
    src: 'http://files.test.sports.lifesense.com/headimg/20170929/ca4473546abf42adae87c878f54d6299.jpg',
    cropShow: false,
    headImgurl: null,
    cropResult: null,
  }
  componentDidMount() {
    const { init, params, location: { query: { memberType } } } = this.props
    const { id } = params || {}
    this.state = {
      supportClick: true,
      multiple: false,
      uploadUrl: `${apiUrl}/commons_rest/file/upload?catalog=headimg&requestId=${this._randomString(16)}`,
      isDragActive: false,
      img: '',
      files: []
    }
    init({
      id,
      memberType
    })
  }

  render() {
    require('../../../styles/member/data.less')
    require('../../../styles/member/memberBtn.less')
    const { params: { id }, member } = this.props

    return (
      <div className="member_data">
        {this._renderTitle()}
        {member && [
          this._renderHead(),
          this._renderPart1(),
          this._renderPart2(),
          (<div key="tip" className="tips">填写真实姓名有助于医生提供精确服务</div>),
          this._renderSave(),
          this._renderDia(),
          this._renderCommon(),
        ]}
        {this._renderCrop()}
      </div>
    )
  }
  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    const { editHeadImg } = this.props
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    let file = this.cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.4)
    let base64Img = file.split(',')[1]
    editHeadImg({ base64Img })
    this.setState({
      cropShow: false
    })

  }

  useDefaultImage() {
    this.setState({ src });
  }
  cropCancel() {
    this.setState({
      cropShow: false
    })
  }
  _renderCrop() {
    const { member } = this.props
    return (
      <div className="m-crop-wrap" style={{ display: this.state.cropShow ? 'block' : 'none' }}>
        <div style={{ width: '100%' }}>
          <Cropper
            style={{ height: '100%', width: '100%' }}
            aspectRatio={9 / 9}
            guides={true}
            zoomable={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
          />
        </div>
        <div>
          <div className="leftBtnWrap">
            <div onClick={() => this.cropCancel()}>
              取消
              </div>
          </div>
          <div className="rightBtnWrap">
            <div onClick={this.cropImage}>
              完成
                </div>
          </div>
        </div>
      </div>
    )
  }
  _randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  _renderTitle() {
    const { params: { id }, location: { query: { mergeaccount } } } = this.props
    let title = ''
    if (mergeaccount - 1 === 0) {
      title = '创建管理员'
    } else {
      if (id === CREATE_MEMBER_ID) {
        title = '添加成员'
      } else {
        title = '成员信息'
      }
    }
    return (
      <Title title={title} />
    )
  }

  onDrop(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false
    });

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }




    this.setState({
      cropShow: true
    })
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);

  }

  open() {
    let fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
    fileInput.value = null;
    fileInput.click();
  }



  // 生成头像
  _renderHead() {
    const { member: { headImgurl, sex }, editHeadImg } = this.props
    const opts = {
      // onClick: () => editHeadImg(),
      src: headImgurl,
      sex,
      tip: require('../../../../static/images/icon_camera.png')
    }
    return (
      <div key="head" className="data_head">
        <AvatarText className="dataTop" {...opts} />
        <input style={{
          opacity: '0',
          width: '2.4rem',
          height: '2.4rem',
          position: 'absolute',
          left: '50%',
          marginLeft: '-1.2rem',
          top: '0.46rem'
        }} type={'file'} ref={'fileInput'} onChange={this.onDrop.bind(this)} />
      </div>
    )
  }

  // 生成菜单一
  _renderPart1() {
    const { nickname, idCard, medicalCard, lifesenseId, sex, birthday, height, weight, waistline } = this.props.member
    const { params: { id } } = this.props
    var opts = [{
      name: '昵称',
      val: nickname,
      onClick: () => this._showEdit('nickname')
    }, {
      name: '性别',
      val: genderFilter(sex),
      onClick: () => this._showSelect('sex')
    }, {
      name: '出生',
      val: birthday ? moment(birthday).format('YYYY-MM-DD') : '请选择',
      onClick: () => this._showSelect('birthday')
    }, {
      name: '身高',
      val: height ? `${height}cm` : '请选择',
      onClick: () => this._showSelect('height')
    }, {
      name: '体重',
      val: weight ? `${weight}kg` : '请选择',
      onClick: () => this._showSelect('weight')
    }, {
      name: '腰围',
      val: waistline ? `${waistline}cm` : '请选择',
      onClick: () => this._showSelect('waistline')
    }, {
      name: '身份证号',
      val: idCard,
      onClick: () => this._showEdit('idCard')
    }, {
      name: '医保卡号',
      val: medicalCard,
      onClick: () => this._showEdit('medicalCard')
    }]
    if (id !== CREATE_MEMBER_ID) {
      opts = [{
        name: '用户ID',
        val: lifesenseId || '暂无',
        onClick: () => {
        }
      }, ...opts]
    }
    return (
      <div key="part1" className="part_one">

        {opts.map((opt, idx) => <Tab key={idx} {...opt} />)}
      </div>
    )
  }

  // 生成菜单二
  _renderPart2() {
    const { name, inviteCount } = this.props.member
    const { params: { id } } = this.props
    // 去掉健康档案，计划放到2.1.2版本开发
    // let opt = []
    // if (id) {
    //   opt = [{
    //     name: '健康档案',
    //     onClick: () => {
    //       window.location.href = `${lxHealthUrl}/redirect/index.html#/healthrecord/index?member_id=${id}`
    //     }
    //   }]
    // }
    const opts = [{
      name: '真实姓名',
      val: name,
      onClick: () => this._showEdit('name')
    }]
    if (id !== CREATE_MEMBER_ID) {
      opts.push(
        {
          name: '分享数据',
          val: inviteCount ? inviteCount + '人' : 0 + '人',
          onClick: () => this._pushAttention()
        }
      )
    }
    return (
      <div key="part2" className="part_two">
        {opts.map((opt, idx) => <Tab key={idx} {...opt} />)}
      </div>
    )
  }

  _pushAttention() {
    const { push, params: { id } } = this.props
    push(`attention/${id}/attentionAccount`)
  }

  // 生成保存按钮
  _renderSave() {
    return (
      <div key="save" className="pageBottomIn">
        <Button onClick={() => this._saveMember()}>保存</Button>
      </div>
    )
  }

  // 生成弹出输入框
  _renderDia() {
    const { member, updateNickName, editShow, filed, showEdit, changeMember, location: { query: { editcenter } } } = this.props

    const def = {
      onClick: (val) => {
        if (filed === 'nickname') {
          if (!val || !val.trim().length) {
            toast('请填写昵称...')
            return
          }
          // if (getByteLen(val) > 10) {
          // toast('不能超过5个汉字或10个英文字母')
          if (val.trim().length > 5) {
            toast('不能超过5个汉字或5个英文字母')
            return
          }
          if (editcenter - 1 === 0) {
            updateNickName(val)
          }

        }
        if (filed === 'name') {
          if (val === '爸爸' || val === '妈妈' || val === '自己') {
            toast('真实姓名不能是爸爸、妈妈、自己')
            return false
          }
        }

        changeMember({ ...member, [filed]: val })
      },
      onClose: () => {
        showEdit({ show: false, filed: null })
      },
      type: 'text',
      value: member[filed],
      pattern: '/^[A-Za-z0-9]*$/'
    }
    const opts = {
      name: {
        maxLength: 20,
        title: '真实姓名',
        ...def
      },
      nickname: {
        maxLength: 5,
        title: '昵称',
        ...def
      },
      idCard: {
        maxLength: 18,
        title: '身份证号',
        ...def
      },
      medicalCard: {
        maxLength: 18,
        title: '医保卡号',
        ...def
      }
    }

    return (
      <InputConFirm key="input" show={editShow} {...opts[filed]} />
    )
  }

  // 生成身高、体重、腰围选择框
  _renderCommon() {
    const { member, selectShow, filed, showSelect, changeMember } = this.props
    const options = {
      onConfirm: (val) => {
        // if (filed === 'sex' && member.headImgurl.startsWith(baseUrl + '/static/images/')) {
        //   member.headImgurl = defMembers[val].headImgurl
        // }

        changeMember({ ...member, [filed]: val })
        showSelect({ show: false, filed: null })
      },
      onCancel: () => showSelect({ show: false, filed: null }),
      value: member[filed],
      type: filed
    }
    return (
      <CommonSelect key="select" show={selectShow} {...options} />
    )
  }

  // 显示编辑框
  _showEdit(filed) {
    this.props.showEdit({ show: true, filed })
  }

  // 显示选择框
  _showSelect(filed) {
    this.props.showSelect({ show: true, filed })
  }

  // 保存成员
  _saveMember() {
    const { save, location: { query: { redirect, deviceId, userNo, mergeaccount } } } = this.props
    save({ redirect, deviceId, userNo, mergeaccount })
  }

})
