export const converterDB = {
    "Volume": {
        base: "l",
        units: {
            "ml": { name: "Milliliters (ml)", mult: 0.001 },
            "cm3": { name: "Cubic centimeters (cm³)", mult: 0.001 },
            "l": { name: "Liters (l)", mult: 1 },
            "m3": { name: "Cubic meters (m³)", mult: 1000 },
            "tsp": { name: "Teaspoons (US)", mult: 0.00492892 },
            "tbsp": { name: "Tablespoons (US)", mult: 0.0147868 },
            "fl_oz": { name: "Fluid Ounces (US)", mult: 0.0295735 },
            "cup": { name: "Cups (US)", mult: 0.236588 },
            "pt": { name: "Pints (US)", mult: 0.473176 },
            "qt": { name: "Quarts (US)", mult: 0.946353 },
            "gal": { name: "Gallons (US)", mult: 3.78541 }
        }
    },
    "Length": {
        base: "m",
        units: {
            "nm": { name: "Nanometers (nm)", mult: 1e-9 },
            "mcm": { name: "Micrometers (μm)", mult: 1e-6 },
            "mm": { name: "Millimeters (mm)", mult: 1e-3 },
            "cm": { name: "Centimeters (cm)", mult: 0.01 },
            "m": { name: "Meters (m)", mult: 1 },
            "km": { name: "Kilometers (km)", mult: 1000 },
            "in": { name: "Inches (in)", mult: 0.0254 },
            "ft": { name: "Feet (ft)", mult: 0.3048 },
            "yd": { name: "Yards (yd)", mult: 0.9144 },
            "mi": { name: "Miles (mi)", mult: 1609.34 },
            "nmi": { name: "Nautical Miles (nmi)", mult: 1852 }
        }
    },
    "Weight and Mass": {
        base: "g",
        units: {
            "mg": { name: "Milligrams (mg)", mult: 0.001 },
            "cg": { name: "Centigrams (cg)", mult: 0.01 },
            "dg": { name: "Decigrams (dg)", mult: 0.1 },
            "g": { name: "Grams (g)", mult: 1 },
            "dag": { name: "Decagrams (dag)", mult: 10 },
            "hg": { name: "Hectograms (hg)", mult: 100 },
            "kg": { name: "Kilograms (kg)", mult: 1000 },
            "t": { name: "Metric Tonnes (t)", mult: 1000000 },
            "oz": { name: "Ounces (oz)", mult: 28.3495 },
            "lb": { name: "Pounds (lb)", mult: 453.592 },
            "st": { name: "Stone (st)", mult: 6350.29 }
        }
    },
    "Energy": {
        base: "j",
        units: {
            "ev": { name: "Electron Volts (eV)", mult: 1.60218e-19 },
            "j": { name: "Joules (J)", mult: 1 },
            "kj": { name: "Kilojoules (kJ)", mult: 1000 },
            "cal": { name: "Calories (cal)", mult: 4.184 },
            "kcal": { name: "Kilocalories (kcal)", mult: 4184 },
            "wh": { name: "Watt-hours (Wh)", mult: 3600 },
            "kwh": { name: "Kilowatt-hours (kWh)", mult: 3600000 },
            "btu": { name: "BTUs", mult: 1055.06 }
        }
    },
    "Area": {
        base: "m2",
        units: {
            "mm2": { name: "Square Millimeters (mm²)", mult: 1e-6 },
            "cm2": { name: "Square Centimeters (cm²)", mult: 0.0001 },
            "m2": { name: "Square Meters (m²)", mult: 1 },
            "km2": { name: "Square Kilometers (km²)", mult: 1000000 },
            "ha": { name: "Hectares (ha)", mult: 10000 },
            "in2": { name: "Square Inches (sq in)", mult: 0.00064516 },
            "ft2": { name: "Square Feet (sq ft)", mult: 0.092903 },
            "yd2": { name: "Square Yards (sq yd)", mult: 0.836127 },
            "ac": { name: "Acres (ac)", mult: 4046.86 },
            "mi2": { name: "Square Miles (sq mi)", mult: 2589988 }
        }
    },
    "Speed": {
        base: "mps",
        units: {
            "cmps": { name: "Centimeters per second (cm/s)", mult: 0.01 },
            "mps": { name: "Meters per second (m/s)", mult: 1 },
            "kmph": { name: "Kilometers per hour (km/h)", mult: 0.277778 },
            "fps": { name: "Feet per second (ft/s)", mult: 0.3048 },
            "mph": { name: "Miles per hour (mph)", mult: 0.44704 },
            "kn": { name: "Knots (kn)", mult: 0.514444 },
            "mach": { name: "Mach", mult: 343 }
        }
    },
    "Time": {
        base: "s",
        units: {
            "ms": { name: "Milliseconds (ms)", mult: 0.001 },
            "s": { name: "Seconds (s)", mult: 1 },
            "min": { name: "Minutes (min)", mult: 60 },
            "h": { name: "Hours (h)", mult: 3600 },
            "d": { name: "Days (d)", mult: 86400 },
            "wk": { name: "Weeks (wk)", mult: 604800 },
            "yr": { name: "Years (yr)", mult: 31536000 }
        }
    },
    "Power": {
        base: "w",
        units: {
            "w": { name: "Watts (W)", mult: 1 },
            "kw": { name: "Kilowatts (kW)", mult: 1000 },
            "hp": { name: "Horsepower (hp)", mult: 745.7 },
            "ftlb": { name: "Foot-pounds/minute", mult: 0.022597 }
        }
    },
    "Data": {
        base: "b",
        units: {
            "bit": { name: "Bits (b)", mult: 0.125 },
            "b": { name: "Bytes (B)", mult: 1 },
            "kb": { name: "Kilobytes (KB)", mult: 1000 },
            "kib": { name: "Kibibytes (KiB)", mult: 1024 },
            "mb": { name: "Megabytes (MB)", mult: 1e6 },
            "mib": { name: "Mebibytes (MiB)", mult: 1048576 },
            "gb": { name: "Gigabytes (GB)", mult: 1e9 },
            "gib": { name: "Gibibytes (GiB)", mult: 1073741824 },
            "tb": { name: "Terabytes (TB)", mult: 1e12 },
            "tib": { name: "Tebibytes (TiB)", mult: 1099511627776 }
        }
    },
    "Pressure": {
        base: "pa",
        units: {
            "pa": { name: "Pascals (Pa)", mult: 1 },
            "kpa": { name: "Kilopascals (kPa)", mult: 1000 },
            "bar": { name: "Bars (bar)", mult: 100000 },
            "atm": { name: "Atmospheres (atm)", mult: 101325 },
            "mmhg": { name: "Millimeters of Mercury (mmHg)", mult: 133.322 },
            "psi": { name: "Pounds per square inch (psi)", mult: 6894.76 }
        }
    },
    "Angle": {
        base: "deg",
        units: {
            "deg": { name: "Degrees (°)", mult: 1 },
            "rad": { name: "Radians (rad)", mult: 57.295779513 },
            "grad": { name: "Gradians (grad)", mult: 0.9 },
            "arcmin": { name: "Arcminutes (')", mult: 0.0166666667 },
            "arcsec": { name: "Arcseconds (\")", mult: 0.000277777778 }
        }
    }
};

// Temperature requires specific offset formulas, so we handle it separately inside stdConverter.js
// Currency requires a dynamic async API fetch, handled in stdConverter.js
