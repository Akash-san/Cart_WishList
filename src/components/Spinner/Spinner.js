import preloader from '../assets/preloader.gif';
const Spinner = () => {
    return (

        <div
            className="preloader d-flex justify-content-center align-items-center"
            style={{ minHeight: '90vh', minWidth: '100%' }}
        >
            <img
                src={preloader}
                alt="loading"
                style={{
                    maxWidth: '100px', 
                    height: 'auto',
                }}
            />
        </div>
    );
};

export default Spinner;
