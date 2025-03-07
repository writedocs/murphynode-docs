import React from "react";
import "./cards.css";
import * as PhosphorIcons from "@phosphor-icons/react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";

function toCamelCaseWithCapitalized(str) {
  return str
    .replace(/-./g, (match) => match.charAt(1).toUpperCase()) // Convert "component-name" to "componentName"
    .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter
}
export default function Card({
  image,
  imageDark,
  icon,
  title,
  link,
  description,
  iconSize,
  iconType,
  children,
}) {
  const classes = description ? "wd_icon_card" : "wd_icon_card title_only_card";
  const formattedIconName = icon && toCamelCaseWithCapitalized(icon);
  const IconComponent = PhosphorIcons[formattedIconName];
  const isImage = /\.(png|jpe?g|gif|svg)$/i.test(icon);
  const { colorMode } = useColorMode();

  const imageSrc = colorMode === "dark" && imageDark ? imageDark : image;

  const renderContent = () => {
    if (children) {
      return <div className="card_content">{children}</div>;
    } else if (description) {
      return <p className="card_content">{description}</p>;
    }
  };

  if (link) {
    const isExternalLink =
      link.startsWith("/") || link.startsWith("#") ? false : true;

    if (isExternalLink) {
      return (
        <a className={classes} target="_blank" href={link}>
          {image && (
            <div className="card_image_container">
              <img
                src={useBaseUrl(imageSrc)}
                className="card_image no_zoom"
                alt={title}
              />
            </div>
          )}
          {icon &&
            !image &&
            (isImage ? (
              <img src={icon} className="icon_img no_zoom" alt={title} />
            ) : (
              <IconComponent size={iconSize || 32} weight={iconType} />
            ))}
          <h3>{title}</h3>
          {renderContent()}
        </a>
      );
    }

    return (
      <Link className={classes} to={link}>
        {image && (
          <div className="card_image_container">
            <img
              src={useBaseUrl(imageSrc)}
              className="card_image no_zoom"
              alt={title}
            />
          </div>
        )}
        {icon &&
          !image &&
          (isImage ? (
            <img src={icon} className="icon_img no_zoom" alt={title} />
          ) : (
            <IconComponent size={iconSize || 32} weight={iconType} />
          ))}
        <h3>{title}</h3>
        {renderContent()}
      </Link>
    );
  }

  return (
    <div className={`${classes} card_no_link`}>
      {image && (
        <div className="card_image_container">
          <img
            src={useBaseUrl(imageSrc)}
            className="card_image no_zoom"
            alt={title}
          />
        </div>
      )}
      {icon &&
        !image &&
        (isImage ? (
          <img src={icon} className="icon_img no_zoom" alt={title} />
        ) : (
          <IconComponent size={iconSize || 32} weight={iconType} />
        ))}
      <h3>{title}</h3>
      {renderContent()}
    </div>
  );
}
