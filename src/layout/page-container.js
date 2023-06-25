const PageContainer = ({
  children
}) => {
  return <>
    <div className='main-page-container col-sm-0 col-md-0 col-lg-9 col-xl-10'>
      {children}
    </div>
  </>
};

export default PageContainer;