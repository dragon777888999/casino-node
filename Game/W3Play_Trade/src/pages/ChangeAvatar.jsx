import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import APP from '../app';

function ChangeAvatar({ onClose }) {

    const [image, setImage] = useState({}),

        //convert to base64
        getBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
                reader.readAsDataURL(file);
            });
        },

        // General focus hook
        UseFocus = () => {
            const htmlElRef = useRef(null),
                setFocus = () => { htmlElRef.current && htmlElRef.current.focus() };

            return [htmlElRef, setFocus]
        },
        [nicknameRef, setNicknameRef] = UseFocus();

    // logic for uploading pic using base64
    function uploadButton() {
        const button = document.getElementById('uploadButton');
        button.click();

        button.addEventListener('change', (e) => {
            e.preventDefault();

            const file = e.target.files[0];
            getBase64(file).then(base64 => {
                const indexOfComma = Array.from(base64).indexOf(',');

                if (base64 === '') {
                    setImage('');
                } else {
                    setImage({ file: base64.substring(indexOfComma + 1), type: file.type });
                }
            })
        })
    }

    // get uploaded user pic or last one he has
    function currentImg(image) {
        if (image?.file) return 'data:image/' + image.type + ';base64,' + image.file;
        else return APP.state.get('customer.avatar');
    }

    //save user changes
    function submit(image, nicknameRef) {
        APP.state.set('customer.avatar', currentImg(image))
        APP.state.set('customer.nickname', nicknameRef?.current?.value)
    }

    // placeholder for input - user nickname
    function userNickname() {
        return APP.state.get('customer.nickname') || 'Enter Nickname';
    }

    return (
        <Wrap>
            <Content>
                <CloseBtn onClick={onClose}>
                    <CloseImg src="/media/images/gold_x.svg" />
                </CloseBtn>
                <Header src="/media/images/text/changeAvatar.png" />
                <SubHeader>{APP.term('change_nickname_subheader')}</SubHeader>
                <AvatarImg src={currentImg(image)} />
                <InnerContent>
                    {/* <FormBox>
                        <Input placeholder={userNickname()} ref={nicknameRef} />
                        <PencilImgBtn onClick={() => setNicknameRef()}>
                            <PencilImg src="/media/images/pencil.svg" />
                        </PencilImgBtn>
                    </FormBox> */}
                    <ButtonsBox>
                        <FileInput id="uploadButton" type="file" />
                        <GenerateBtn>{APP.term('generate_avatar')}</GenerateBtn>
                        <TxtSeperator>{APP.term('change_avatar_or')}</TxtSeperator>
                        <UploadBtn onClick={() => uploadButton()}>{APP.term('upload_pic')}</UploadBtn>
                    </ButtonsBox>
                    <ApplyBtnBox onClick={() => submit(image, nicknameRef)}>
                        <ApplyBtn>{APP.term('apply_changes')}</ApplyBtn>
                    </ApplyBtnBox>
                </InnerContent>
            </Content>
        </Wrap>
    )
}

export default ChangeAvatar;

const Wrap = styled.div`
    height: 100%; width: 100%;
    background-color: rgba(12, 13, 19, 0.8);
    position: absolute; top: 0; left: 0;
    display: flex; justify-content: center; align-items: center;
    z-index: 16;
`,
    Content = styled.div`
        position: relative;
        display: flex; flex-direction: column; align-items: center;
        padding-top: 1.4em;
        width: 40em; height: 33.5em;
        margin: 1.1em 1.7em 0 0;
        padding: 1.4em 0 .9em;
        border-radius: 2.2em;
        border: solid 2px #f4d56f;
        background-color: #0c0d13;
    `,
    CloseBtn = styled.div`
        position: absolute; top: -1.2em; right: -1.5em;
        display: flex; justify-content: center; align-items: center;
        width: 3em; height: 3em;
        border-radius: 50%;
        border: solid 2px #f4d56f;
        background-color: #0c0d13;
        cursor: pointer;
        
        &:hover{ opacity: .7; }
    `,
    CloseImg = styled.img`
        height: 1.5em; width: 1.5em;
    `,
    Header = styled.img`
        margin-top: .2em;
        width: 38em; height: 3.7em;
    `,
    SubHeader = styled.p`
        width: 84%;
        opacity: 0.7;
        font-family: Barlow Semi Condensed;
        font-size: 1.8em;
        font-weight: 600;
        font-style: italic;
        letter-spacing: -0.53px;
        text-align: center;
        color: #fff;
        margin-top: -.1em;
    `,
    AvatarImg = styled.img`
        height: 5em; width: 5em;
        border-radius: 50%;
    `,
    InnerContent = styled.div`
        display: flex; flex-direction: column; align-items: center; justify-content: space-between;
        width: 28em; height: 16.5em;
        margin-top: .5em;
    `,
    FormBox = styled.div`
       position: relative;
       display: flex; 
       height: 3.7em; width: 100%;
    `,
    Input = styled.input`
        width: 100%;
        background-color: transparent;
        border: none;
        border-bottom: solid 2px #ffffff99;
        outline: none;
        color: #ffffff99;
        font-size: 2.2em;
        font-weight: 600;
        text-align: center;
    `,
    PencilImgBtn = styled.div`
        outline: none;
        cursor: pointer;
        border: none;
        width: 3.2em; height: 3.2em;
        position: absolute; right: 0; bottom: .6em;
        display: flex; justify-content: center; align-items: center;
        border-radius: 50%;
        background-color: #d8d8d833;

        &:hover{ opacity: .7; }
    `,
    PencilImg = styled.img`
        object-fit: contain;
        height: 1.5em; width: 1.5em;
    `,
    ButtonsBox = styled.div`
        height: 4em; width: 100%;
        display: flex; justify-content: space-between; align-items: center;
    `,
    FileInput = styled.input`
        display: none;
    `,
    GenerateBtn = styled.button`
        display: flex; align-items: center; justify-content: center;
        width: 12em; height: 100%;
        border-radius: 3.2px;
        border: solid 1px #565656;
        background-color: #3f3f3f;
        font-size: 1.36em;
        font-weight: 600;
        text-align: center;
        color: #f4d56f;
        cursor: pointer;

        &:hover{ opacity: .7; }
    `,
    TxtSeperator = styled.p`
        display: flex; justify-content: center; align-items: center;
        width: 4em; height: 100%;
        font-size: 1.28em;
        text-align: center;
        color: #71787d;
    `,
    UploadBtn = styled.button`
        display: flex; align-items: center; justify-content: center;
        width: 12em; height: 100%;
        background-color: transparent;
        border-radius: 3.2px;
        border: solid 0.8px #565656;
        font-size: 1.36em;
        font-weight: 600;
        text-align: center;
        color: #f4d56f;
        cursor: pointer;

        &:hover{ opacity: .7; }
    `,
    ApplyBtnBox = styled.div`
        height: 3.8em; width: 100%;
    `,
    ApplyBtn = styled.button`
        width: 100%; height: 100%;
        border-radius: 4.6px;
        border: solid .12em #f4d56f;
        font-size: 1.85em;
        font-weight: bold;
        color: #000;
        cursor: pointer;
        background-image: linear-gradient(96deg, #d99e38 0%, #fff585 15%, #ebbc53 24%, #edc964 54%, #e4b54f 72%, #dfa942 82%, #dda53e 84%, #e1ac43 87%, #eebf50 90%, #fbd35e 93%, #f9d15d 97%, #f4ca58 98%, #eabd50 99%, #dcab45 100%, #c99437 101%, #b47926 103%);
        
        &:hover{ opacity: .7; }
    `
