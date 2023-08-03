

function Alerta({setError, smsError}){
   
    return(
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
           {smsError}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setError(false)}
            ></button>
        </div>
    )
}

export default Alerta;