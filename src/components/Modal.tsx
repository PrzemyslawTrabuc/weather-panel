import React from "react";
import {Modal} from "@mantine/core";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import {toggleModal} from './Modal/ModalSlice';

const MyModal = () =>{
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.Modal.isOpen);

    const renderDetailsModal = (cityNumber: number) =>{
        
    }
    return(
        <Modal
            opened={isOpen}
            onClose={() => dispatch(toggleModal())}
            title="Introduce yourself!"
        >
            {/* Modal content */}
        </Modal>
    )
}

export default MyModal