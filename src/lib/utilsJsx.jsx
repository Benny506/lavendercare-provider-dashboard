export const RISK_LEVEL_STYLES = {
  "low": { 
    bg: 'bg-green-100', 
    text: 'text-green-700', 
    interpretation: 'Minimal concern — generally safe or healthy condition' 
  }, 
  "mild": { 
    bg: 'bg-yellow-100', 
    text: 'text-yellow-700', 
    interpretation: 'Slight concern — monitor but not alarming' 
  },
  "moderate": { 
    bg: 'bg-orange-100', 
    text: 'text-orange-700', 
    interpretation: 'Noticeable concern — requires attention soon' 
  },
  "worrying": { 
    bg: 'bg-amber-200', 
    text: 'text-amber-800', 
    interpretation: 'Concerning — needs active monitoring or action' 
  },
  "high": { 
    bg: 'bg-red-100', 
    text: 'text-red-700', 
    interpretation: 'Serious concern — immediate action recommended' 
  },
  "very high": { 
    bg: 'bg-rose-100', 
    text: 'text-rose-700', 
    interpretation: 'Critical — urgent and potentially dangerous situation' 
  }
};

export const getInterpretation = (risklevel) => {
    return RISK_LEVEL_STYLES[risklevel]?.interpretation
}

export function getRiskLevelBadge(riskLevel) {
    const { bg, text } = RISK_LEVEL_STYLES[riskLevel] || RISK_LEVEL_STYLES["moderate"];
    return (
        <span className={`${bg} ${text} px-3 py-1 rounded-full text-sm font-medium`}>
            {riskLevel}
        </span>
    );
}

export function getRiskLevelBadgeClass(riskLevel){
    const { bg, text } = RISK_LEVEL_STYLES[riskLevel] || RISK_LEVEL_STYLES["moderate"];

    return `${bg} ${text}`
}