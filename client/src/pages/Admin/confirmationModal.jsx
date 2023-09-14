import React from 'react'

const confirmationModal = () => {
  return (
    <div>
      <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to discard all of your notes?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
              Discard notes
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
    </div>
  )
}

export default confirmationModal
