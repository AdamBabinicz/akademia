import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl"; // Import useIntl
import { Cpu, Battery, Lightbulb, Minus, Power, Move } from "lucide-react";

interface Component {
  id: string;
  type: "battery" | "bulb" | "wire" | "switch";
  x: number;
  y: number;
}

export function CircuitBuilder() {
  const [components, setComponents] = useState<Component[]>([]);
  const [circuitClosed, setCircuitClosed] = useState(false);
  const intl = useIntl(); // Initialize useIntl hook

  const componentIcons = {
    battery: Battery,
    bulb: Lightbulb,
    wire: Minus,
    switch: Power,
  };

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData("componentType", componentType);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData(
      "componentType"
    ) as Component["type"];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newComponent: Component = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      x,
      y,
    };

    setComponents((prev) => [...prev, newComponent]);

    const hasBattery = [...components, newComponent].some(
      (c) => c.type === "battery"
    );
    const hasBulb = [...components, newComponent].some(
      (c) => c.type === "bulb"
    );
    const hasWires =
      [...components, newComponent].filter((c) => c.type === "wire").length >=
      2;

    setCircuitClosed(hasBattery && hasBulb && hasWires);
  };

  const ComponentPalette = ({ type }: { type: Component["type"] }) => {
    const IconComponent = componentIcons[type];
    const colorClasses = {
      battery: "bg-primary",
      bulb: "bg-accent",
      wire: "bg-muted",
      switch: "bg-destructive",
    };

    return (
      <div
        className="circuit-component p-4 bg-secondary rounded-lg border-2 border-dashed border-border text-center cursor-grab"
        draggable
        onDragStart={(e) => handleDragStart(e, type)}
        role="button"
        tabIndex={0}
        // Użyj intl.formatMessage do pobrania stringa
        aria-label={intl.formatMessage({
          id: `circuit.dragComponent`,
          defaultMessage: "Przeciągnij komponent",
        })}
        data-testid={`component-${type}`}
      >
        <div
          className={`w-8 h-8 ${colorClasses[type]} rounded mx-auto mb-2 flex items-center justify-center`}
        >
          <IconComponent className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-sm">
          <FormattedMessage id={`circuit.${type}`} />
        </span>
      </div>
    );
  };

  return (
    <div
      className="interactive-module rounded-xl p-8"
      data-testid="circuit-builder-module"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <Cpu className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-card-foreground">
          <FormattedMessage
            id="circuitBuilder.title"
            defaultMessage="Konstruktor obwodów"
          />
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <p className="text-muted-foreground mb-6">
            <FormattedMessage
              id="circuit.remember"
              defaultMessage="Pamiętaj, aby zbudować zamknięty obwód, potrzebujesz źródła zasilania (baterii), odbiornika (żarówki) oraz przewodów. Spróbuj dodać przełącznik, aby kontrolować przepływ prądu!"
            />
          </p>

          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">
              <FormattedMessage
                id="circuit.components"
                defaultMessage="Komponenty:"
              />
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <ComponentPalette type="battery" />
              <ComponentPalette type="bulb" />
              <ComponentPalette type="wire" />
              <ComponentPalette type="switch" />
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-6" style={{ height: "400px" }}>
          <h4 className="text-sm font-medium text-muted-foreground mb-4">
            <FormattedMessage
              id="circuit.buildArea"
              defaultMessage="Obszar budowy obwodu"
            />
          </h4>

          <div
            className="w-full h-full bg-background border-2 border-dashed border-border rounded-lg relative"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            role="application"
            aria-label={intl.formatMessage({
              id: "circuit.dropZoneAriaLabel",
              defaultMessage: "Obszar budowy obwodu - upuść tutaj komponenty",
            })}
            data-testid="circuit-drop-zone"
          >
            {components.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Move className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    <FormattedMessage
                      id="circuit.dragHere"
                      defaultMessage="Przeciągnij i upuść komponenty tutaj"
                    />
                  </p>
                  <p className="text-xs opacity-70">
                    <FormattedMessage
                      id="circuit.toBuild"
                      defaultMessage="aby zbudować swój obwód"
                    />
                  </p>
                </div>
              </div>
            ) : (
              components.map((component) => {
                const IconComponent = componentIcons[component.type];
                return (
                  <div
                    key={component.id}
                    className="absolute w-8 h-8 bg-primary rounded flex items-center justify-center"
                    style={{ left: component.x - 16, top: component.y - 16 }}
                    data-testid={`placed-${component.type}`}
                  >
                    <IconComponent className="w-4 h-4 text-primary-foreground" />
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              <FormattedMessage id="circuit.status" defaultMessage="Status" />:
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                circuitClosed
                  ? "bg-primary text-primary-foreground"
                  : "bg-destructive text-destructive-foreground"
              }`}
              data-testid="circuit-status"
            >
              <FormattedMessage
                id={circuitClosed ? "circuit.closed" : "circuit.open"}
                defaultMessage={circuitClosed ? "Zamknięty" : "Otwarty"}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircuitBuilder;
