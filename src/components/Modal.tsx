import React from "react";
import ReactDOM from 'react-dom';
//import {Modal} from "@mantine/core";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import {toggleModal} from './Modal/ModalSlice';

const Modal = (props:any) => {
    return ReactDOM.createPortal(
        <div style={{visibility: props.isVisible ? "visible" : "hidden", backgroundColor:"white", position:"absolute", top:"50px", width:"600px", height:"300px"}}>
        <div onClick={props.onDismiss} style={{position:"abolsute", top:"50px", widht:"600px", height:"300px"}} >
            <div onClick={(e) => e.stopPropagation()}
                 style={{margin: "auto", bottom: "auto", top: "15%"}}>
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;