import './spinner.css'


function Spinner() {

    return (
        <div className="spinner-main">
            <div class="spinner-border"  role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}

export default Spinner;