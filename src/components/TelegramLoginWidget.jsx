import React, { useEffect } from 'react';

function TelegramLoginWidget() {
  useEffect(() => {
    const { telegramLogin, size, userpic = true, radius = null, requestAccess = null, onTelegramAuth } = this.props;

    // window.TelegramLoginWidget = {
    //   dataOnauth: (user) => dataOnauth(user),
    // };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?5';
    script.setAttribute('data-telegram-login', telegramLogin);
    script.setAttribute('data-size', size);

    if (!userpic) script.setAttribute('data-userpic', !!userpic);

    if (radius != null) script.setAttribute('data-radius', radius);

    if (requestAccess) script.setAttribute('data-request-access', 'write');

    script.setAttribute('data-onauth', 'TelegramLoginWidget.onTelegramAuth(user)');
    script.async = true;
    this.instance.appendChild(script);
  });

  return (
    <div
      className={this.props.className}
      ref={component => {
        this.instance = component;
      }}
    >
      {this.props.children}
    </div>
  );
}

export default TelegramLoginWidget;
