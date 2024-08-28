function formatCreatedDate(createdDate) {
  const date = new Date(createdDate);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export { formatCreatedDate };
