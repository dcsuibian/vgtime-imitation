FROM openjdk:21
LABEL authors="dcsuibian"

COPY target/*.jar /app.jar

EXPOSE 9528
ENTRYPOINT ["java", "-jar","/app.jar","--spring.profiles.active=prod"]
