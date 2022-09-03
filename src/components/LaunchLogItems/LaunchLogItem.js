function LaunchLogItem({
  flight_number,
  launch_date_utc,
  launch_site,
  mission_name,
  rocket,
  launch_success,
}) {
  const date = new Intl.DateTimeFormat("default", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(launch_date_utc));

  return (
    <tr>
      <td>{flight_number < 10 ? `0${flight_number}` : flight_number}</td>
      <td>{date}</td>
      <td>{launch_site.site_name}</td>
      <td>{mission_name}</td>
      <td>{rocket.second_stage.payloads[0].orbit}</td>
      <td className="status">
        {launch_success ? (
          <button className={launch_success ? "success" : "failed"}>
            Success
          </button>
        ) : (
          <button className={launch_success ? "success" : "failed"}>
            Failed
          </button>
        )}
      </td>
      <td>{rocket.rocket_name}</td>
    </tr>
  );
}

export default LaunchLogItem;
