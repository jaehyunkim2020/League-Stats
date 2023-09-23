
type Region = 'na1' | 'br1' | 'la1' | 'la2' | 'kr' | 'jp1' | 'eun1' | 'euw1' | 'tr1' | 'ru' | 'oc1' | 'ph2' | 'sg2' | 'th2' | 'tw2' | 'vn2';

// a function to convert specific regions to their general routing value
export function getRoutingValue(region: Region): string {
    const map: Record<Region, string> = {
        'na1': 'AMERICAS',
        'br1': 'AMERICAS',
        'la1': 'AMERICAS',  // LAN
        'la2': 'AMERICAS',  // LAS
        'kr': 'ASIA',       // KR
        'jp1': 'ASIA',      // JP
        'eun1': 'EUROPE',   // EUNE
        'euw1': 'EUROPE',   // EUW
        'tr1': 'EUROPE',    // TR
        'ru': 'EUROPE',     // RU
        'oc1': 'SEA',       // OCE
        'ph2': 'SEA',       // PH2
        'sg2': 'SEA',       // SG2
        'th2': 'SEA',       // TH2
        'tw2': 'SEA',       // TW2
        'vn2': 'SEA'        // VN2
    };
    
    return map[region] || region;
}