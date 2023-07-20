import formOk from "../images/Form-ok.svg"
import formFail from "../images/Form-fail.svg"

function InfoTooltip({ isOpen, onClose, ok }) {

    function closePopupOnOverlayClick (evt) {
        if (evt.target == evt.currentTarget) {
          onClose();
        }
      }

    return (
        <section className={`info-tooltip ${isOpen && "info-tooltip_opened"}`} onClick={closePopupOnOverlayClick}>
            <div className="info-tooltip__container">
                <img className="info-tooltip__img" src={ok ? formOk : formFail} />
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <p className="info-tooltip__text">{ok ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
            </div>
        </section>
    );
}

export default InfoTooltip;