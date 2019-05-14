import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function TelegramLoginButton({ children, className, botName, onAuth }) {
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    if (!instance) return;

    if (instance.children.length > 0) return;

    window.TelegramLoginWidget = {
      dataOnAuth: user => onAuth(user),
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?5';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', 'large'); // Size of the button
    script.setAttribute('data-radius', '4'); // Corners of the button
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'true');

    script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnAuth(user)');
    script.async = true;

    if (instance) instance.appendChild(script);
  });

  return (
    <div className={className} ref={component => setInstance(component)}>
      {children}
    </div>
  );
}

TelegramLoginButton.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string.isRequired,
  botName: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
};

TelegramLoginButton.defaultProps = {
  children: undefined,
};

export default TelegramLoginButton;
