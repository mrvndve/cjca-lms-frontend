const WebContainer = ({ children }) => {
  return <>
    <div className='d-none d-lg-block h-100'>
      {children}
    </div>
  </>
}

export default WebContainer;