#!/usr/bin/env bash
# Script para remover arquivos/desnecessários (mantém apenas SauceDemo.spec.ts e suporte mínimo)
set -euo pipefail
cd "$(dirname "$0")"/.. || exit 1
ROOT=$(pwd)

echo "PWD: $ROOT"

# Arquivos e pastas a remover (relativos à raiz)
rm -f src/scenarios/CadastroDelivery.spec.ts
rm -f src/scenarios/Contact.spec.ts
rm -f src/scenarios/ContatoEmpresa.spec.ts
rm -f src/scenarios/ContatoFarmacia.spec.ts
rm -f src/scenarios/FindProduct.spec.ts
rm -f src/scenarios/Visitas.spec.ts
rm -f src/scenarios/VisitasForm.spec.ts
rm -f src/scenarios/ZeroStepExample.spec.ts

rm -f src/support/pages/ContactPage.ts
rm -f src/support/pages/EmpresaPage.ts
rm -f src/support/pages/FarmaciaPage.ts
rm -f src/support/pages/HomePage.ts
rm -f src/support/pages/VisitasPage.ts

rm -f src/support/elements/ContactElements.ts
rm -f src/support/elements/EmpresaElements.ts
rm -f src/support/elements/FarmaciaElements.ts
rm -f src/support/elements/HomeElements.ts
rm -f src/support/elements/VisitasElements.ts

# Print remaining files in src/scenarios and src/support
echo "\nRemaining in src/scenarios:"
ls -la src/scenarios || true

echo "\nRemaining in src/support/pages:"
ls -la src/support/pages || true

echo "\nRemaining in src/support/elements:"
ls -la src/support/elements || true

echo "\nCleanup script finished." 
