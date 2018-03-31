#export LC_CTYPE="zh_CN.UTF-8"
#Export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN.UTF-8 
export GTK_IM_MODEULE=fcitx
export QT_IM_MODEULE=fcitx
export XMODIFIERS="@im=fcitx"
exec dbus-launch $HOME/software/stumpwm/bin/stumpwm
