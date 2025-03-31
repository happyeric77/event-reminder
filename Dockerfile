FROM node:18.20.4

# 安裝 cron
RUN apt update -y && apt install -y cron

# 設置時區
ENV TZ=Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 創建 appuser 用戶
RUN useradd -m appuser

# 切換到 root 用戶，複製 crontab 文件並設置權限
USER root
COPY crontab /home/appuser/app-cron
RUN chown appuser:appuser /home/appuser/app-cron
RUN chmod gu+rw /var/run
RUN chmod gu+s /usr/sbin/cron


# 切換到 appuser 用戶並安裝 crontab
USER appuser
RUN crontab /home/appuser/app-cron

# 切換到工作目錄並複製代碼
WORKDIR /home/appuser/app
COPY . /home/appuser/app

# 切換回 root 用戶以更改文件所有權
USER root
RUN chown -R appuser:appuser /home/appuser/app

# 切換回 appuser 並安裝依賴
USER appuser
RUN npm install

# 使用 appuser 啟動 cron

ENTRYPOINT ["cron", "-f"]