import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput'

export default class FormDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            discripution: ''
        }
        this.inputName = this.inputName.bind(this)
        this.inputEmail = this.inputEmail.bind(this)
        this.inputDiscripution = this.inputDiscripution.bind(this)
    }

    inputName = (event) => {
        this.setState({ name: event.target.value })
    }

    inputEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    inputDiscripution = (event) => {
        this.setState({ discripution: event.target.value })
    }

    submitForm = () => {
        const name = this.state.name
        const email = this.state.email
        const discripution = this.state.discripution

        const payload = {
            text:'【New Contact】\n' +
                 ' Name：' + name + '\n' +
                 ' Email：' + email + '\n' + 
                 ' Content：\n' + discripution
        }

    const url = 'https://hooks.slack.com/services/*****************************************'

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload)
    }).then(() => {
        alert('送信が完了しました。追ってご連絡します！')
        this.setState({
            name: '',
            email: '',
            discripution: ''
        })
        return this.props.handleClose()
    })
    }
    
    render(){
        return(
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
                <DialogContent>
                    <TextInput 
                        label={"お名前 *"} multiline={false} rows={1}
                        value={this.state.name} type={'text'} onChange={this.inputName}
                    />
                    <TextInput 
                        label={"メールアドレス *"} multiline={false} rows={1}
                        value={this.state.email} type={'email'} onChange={this.inputEmail}
                    />
                    <TextInput 
                        label={"お問い合わせ内容 *"} multiline={true} rows={5}
                        value={this.state.discripution} type={'text'} onChange={this.inputDiscripution}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        キャンセル
                    </Button>
                    <Button onClick={this.submitForm} color="primary" autoFocus>
                        送信する
                    </Button>
                </DialogActions>
             </Dialog>
    
        )
    }
}
