import React, { useContext, useEffect, useState } from "react";
import "../css/FrauMohn.css";
import Button from "./Button";

function FrauMohn() {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div style={{ display: isOpen ? "block" : "none" }}>
			<div className="model-background" />
			<div className="model">
				<h1>Frau Mohn</h1>

				<p>
					Liebe Frau Mohn, sie sind mit abstand die schrecklichste info lehrerin
					everrrrr ... noch nach Frau Molnar und die konnte noch nicht mal
					deutsch. Sie sind <span className="highlighted">dumm</span> und{" "}
					<span className="highlighted">unfähig</span> und sollten entweder
					wieder schwanger werden oder aufhören zu unterrichten.
				</p>

				<Button onClick={() => setIsOpen(false)}>
					Ich bin nicht Frau Mohn
				</Button>
			</div>
		</div>
	);
}

export default FrauMohn;
