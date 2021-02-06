import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Link from '@material-ui/core/Link';
import FormMaterial from './FormMaterial';

export default function AddMaterialModal({ onUpdate }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const onSave = () => {
    onUpdate();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link color="primary" href="#" onClick={handleOpen}>
        Adicionar
      </Link>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <FormMaterial onSave={onSave} />
      </Modal>
    </div>
  );
}
