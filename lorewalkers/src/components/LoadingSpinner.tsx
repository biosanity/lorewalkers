import './LoadingSpinner.scss';

function LoadingSpinner({isLoading}: any) {

    return (
        <div className="lds-spinner" style={{display: isLoading ? "block" : "none"}}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
  }
  
  export default LoadingSpinner; 