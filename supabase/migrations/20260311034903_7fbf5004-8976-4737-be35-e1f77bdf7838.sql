
-- Feature 1: Microplastics & Nanoplastics Risk Scoring
CREATE TABLE public.microplastic_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  overall_risk_score INTEGER DEFAULT 0,
  packaging_risk INTEGER DEFAULT 0,
  category_risk INTEGER DEFAULT 0,
  processing_risk INTEGER DEFAULT 0,
  transparency_score INTEGER DEFAULT 0,
  nanoplastic_flag BOOLEAN DEFAULT false,
  risk_level TEXT DEFAULT 'low',
  primary_risk_sources JSONB DEFAULT '[]'::jsonb,
  mitigation_suggestions JSONB DEFAULT '[]'::jsonb,
  last_calculated TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.microplastic_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  journal TEXT,
  year INTEGER,
  doi_url TEXT,
  product_category TEXT,
  findings_summary TEXT,
  particles_found TEXT,
  particle_size_range TEXT,
  methodology TEXT,
  sample_size INTEGER,
  geographic_region TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.packaging_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  primary_packaging TEXT,
  material_detail TEXT,
  resin_code TEXT,
  bpa_free BOOLEAN DEFAULT false,
  plastic_contact_surface_area_cm2 NUMERIC,
  known_leaching_compounds JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE public.packaging_risk_factors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  packaging_type TEXT NOT NULL,
  material_code TEXT,
  microplastic_risk_level TEXT DEFAULT 'low',
  nanoplastic_risk_level TEXT DEFAULT 'low',
  heat_sensitivity BOOLEAN DEFAULT false,
  study_references JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE public.category_microplastic_risk (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  subcategory TEXT,
  risk_level TEXT DEFAULT 'low',
  microplastics_per_unit_estimate TEXT,
  major_sources JSONB DEFAULT '[]'::jsonb,
  studies JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE public.processing_risk_factors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  process_type TEXT NOT NULL,
  temperature_range TEXT,
  plastic_contact_duration TEXT,
  risk_multiplier NUMERIC DEFAULT 1.0,
  particle_release_estimate TEXT,
  notes TEXT
);

-- Feature 2: PFAS Forever Chemicals
CREATE TABLE public.pfas_packaging_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_or_chain TEXT,
  product_type TEXT,
  pfas_detected BOOLEAN DEFAULT false,
  pfas_compounds JSONB DEFAULT '[]'::jsonb,
  detection_level_ppt NUMERIC,
  test_source TEXT,
  test_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.pfas_water_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zip_code TEXT NOT NULL,
  water_utility TEXT,
  pfas_total_ppt NUMERIC,
  pfas_compounds_detected JSONB DEFAULT '[]'::jsonb,
  exceeds_epa_advisory BOOLEAN DEFAULT false,
  last_tested DATE,
  source TEXT
);

CREATE TABLE public.cookware_safety (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT,
  product_name TEXT NOT NULL,
  material TEXT NOT NULL,
  pfas_free_certified BOOLEAN DEFAULT false,
  safe_temperature_max INTEGER,
  kleen_score INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.pfas_contamination_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL,
  site_type TEXT,
  lat NUMERIC,
  lng NUMERIC,
  pfas_compounds JSONB DEFAULT '[]'::jsonb,
  contamination_level TEXT,
  remediation_status TEXT,
  source_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.brand_pfas_commitments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL,
  commitment_text TEXT,
  deadline DATE,
  status TEXT DEFAULT 'announced',
  verified BOOLEAN DEFAULT false,
  source_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Feature 3: Packaging Migration & Container Safety
CREATE TABLE public.container_chemicals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  container_type TEXT NOT NULL,
  chemical_name TEXT NOT NULL,
  migration_rate_at_room_temp TEXT,
  migration_rate_at_heat TEXT,
  health_concern TEXT,
  endocrine_disruptor BOOLEAN DEFAULT false,
  carcinogen_classification TEXT,
  regulatory_status JSONB DEFAULT '{}'::jsonb,
  studies JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE public.product_packaging_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  container_type TEXT,
  primary_material TEXT,
  secondary_material TEXT,
  lining_type TEXT,
  cap_seal_material TEXT,
  migration_risk_score INTEGER DEFAULT 0,
  chemicals_of_concern JSONB DEFAULT '[]'::jsonb,
  heat_sensitivity_warning BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.storage_container_database (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT,
  product_name TEXT NOT NULL,
  material TEXT NOT NULL,
  resin_code TEXT,
  bpa_free BOOLEAN DEFAULT false,
  phthalate_free BOOLEAN DEFAULT false,
  dishwasher_safe_safely BOOLEAN DEFAULT false,
  microwave_safe_safely BOOLEAN DEFAULT false,
  safety_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Feature 4: Mycotoxin & Mold Contamination
CREATE TABLE public.mycotoxin_risk_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  overall_mycotoxin_risk TEXT DEFAULT 'low',
  specific_mycotoxin_risks JSONB DEFAULT '[]'::jsonb,
  mitigation_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Feature 5: Processing Contaminants
CREATE TABLE public.processing_contaminant_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  overall_processing_risk INTEGER DEFAULT 0,
  acrylamide_risk INTEGER DEFAULT 0,
  three_mcpd_risk INTEGER DEFAULT 0,
  pah_risk INTEGER DEFAULT 0,
  hca_risk INTEGER DEFAULT 0,
  age_risk INTEGER DEFAULT 0,
  furan_risk INTEGER DEFAULT 0,
  nitrosamine_risk INTEGER DEFAULT 0,
  trans_fat_risk INTEGER DEFAULT 0,
  risk_factors JSONB DEFAULT '[]'::jsonb,
  mitigation_tips JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.cooking_safety_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  food_type TEXT NOT NULL,
  cooking_method TEXT NOT NULL,
  contaminant_risks JSONB DEFAULT '[]'::jsonb,
  safer_alternatives JSONB DEFAULT '[]'::jsonb,
  risk_reduction_tips JSONB DEFAULT '[]'::jsonb
);

-- Feature 6: Antibiotic, Hormone & Drug Residue
CREATE TABLE public.pesticide_residue_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  pesticide_name TEXT NOT NULL,
  residue_level_ppm NUMERIC,
  legal_limit_ppm NUMERIC,
  health_guideline_ppm NUMERIC,
  exceeds_guideline BOOLEAN DEFAULT false,
  test_source TEXT,
  test_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.seafood_safety_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  farmed_vs_wild TEXT,
  country_of_origin TEXT,
  known_drug_residue_risks JSONB DEFAULT '[]'::jsonb,
  fda_import_alert BOOLEAN DEFAULT false,
  aquaculture_practices_known JSONB DEFAULT '[]'::jsonb,
  safety_score INTEGER DEFAULT 0
);

CREATE TABLE public.residue_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  antibiotic_risk INTEGER DEFAULT 0,
  hormone_risk INTEGER DEFAULT 0,
  pesticide_risk INTEGER DEFAULT 0,
  drug_residue_risk INTEGER DEFAULT 0,
  overall_residue_score INTEGER DEFAULT 0,
  organic_certified BOOLEAN DEFAULT false,
  label_claims JSONB DEFAULT '[]'::jsonb,
  country_of_origin TEXT,
  risk_factors JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.label_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_text TEXT NOT NULL,
  regulated_by TEXT,
  actual_meaning TEXT,
  trust_level TEXT DEFAULT 'moderate',
  applies_to_categories JSONB DEFAULT '[]'::jsonb
);

-- Feature 7: Food Fraud & Adulteration
CREATE TABLE public.food_fraud_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  overall_fraud_risk TEXT DEFAULT 'low',
  fraud_type_risks JSONB DEFAULT '[]'::jsonb,
  certifications_verified JSONB DEFAULT '[]'::jsonb,
  brand_trust_score INTEGER DEFAULT 50,
  price_authenticity_check TEXT,
  origin_verification_level TEXT,
  third_party_testing BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.food_fraud_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_category TEXT,
  brand TEXT,
  incident_description TEXT NOT NULL,
  date_reported DATE,
  source_url TEXT,
  regulatory_action TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Feature 8: Radiation & Environmental Contaminants
CREATE TABLE public.irradiation_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  irradiation_likely BOOLEAN DEFAULT false,
  irradiation_required BOOLEAN DEFAULT false,
  irradiation_disclosed BOOLEAN DEFAULT false,
  impact_on_nutrition JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE public.heavy_metal_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  lead_risk INTEGER DEFAULT 0,
  arsenic_risk INTEGER DEFAULT 0,
  cadmium_risk INTEGER DEFAULT 0,
  mercury_risk INTEGER DEFAULT 0,
  test_results JSONB DEFAULT '[]'::jsonb,
  risk_by_serving_size TEXT,
  cumulative_exposure_note TEXT
);

CREATE TABLE public.regional_contamination_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region TEXT NOT NULL,
  country TEXT,
  contaminant TEXT NOT NULL,
  contamination_level TEXT,
  source_cause TEXT,
  affected_product_categories JSONB DEFAULT '[]'::jsonb,
  data_source TEXT,
  last_updated TIMESTAMPTZ DEFAULT now()
);

-- Feature 9: Total Exposure Engine
CREATE TABLE public.total_exposure_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  week_of DATE NOT NULL,
  microplastic_score INTEGER DEFAULT 0,
  pfas_score INTEGER DEFAULT 0,
  heavy_metal_score INTEGER DEFAULT 0,
  mycotoxin_score INTEGER DEFAULT 0,
  processing_contaminant_score INTEGER DEFAULT 0,
  packaging_migration_score INTEGER DEFAULT 0,
  pesticide_score INTEGER DEFAULT 0,
  drug_residue_score INTEGER DEFAULT 0,
  endocrine_disruptor_load INTEGER DEFAULT 0,
  total_exposure_score INTEGER DEFAULT 0,
  trend_vs_last_week TEXT,
  percentile_vs_community INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.exposure_reduction_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action_type TEXT NOT NULL,
  description TEXT NOT NULL,
  estimated_reduction_percent INTEGER DEFAULT 0,
  contaminant_targeted TEXT,
  status TEXT DEFAULT 'suggested',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

CREATE TABLE public.user_vulnerability_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  flag_type TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  activated_at TIMESTAMPTZ DEFAULT now()
);

-- Feature 10: Food Safety News & Recall Intelligence
CREATE TABLE public.recall_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_agency TEXT,
  recall_id TEXT,
  product_name TEXT NOT NULL,
  brand TEXT,
  reason TEXT,
  severity TEXT DEFAULT 'class_II',
  description TEXT,
  affected_lot_numbers TEXT,
  distribution_states JSONB DEFAULT '[]'::jsonb,
  recall_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.food_safety_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  source TEXT,
  url TEXT,
  summary TEXT,
  category TEXT,
  relevance_tags JSONB DEFAULT '[]'::jsonb,
  published_date TIMESTAMPTZ,
  kleen_analysis TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.outbreak_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pathogen TEXT NOT NULL,
  product_source TEXT,
  states_affected JSONB DEFAULT '[]'::jsonb,
  cases_reported INTEGER DEFAULT 0,
  hospitalizations INTEGER DEFAULT 0,
  deaths INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  cdc_investigation_id TEXT,
  start_date DATE,
  update_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.brand_safety_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL,
  recall_count_5yr INTEGER DEFAULT 0,
  recall_severity_avg NUMERIC,
  testing_transparency TEXT,
  certifications JSONB DEFAULT '[]'::jsonb,
  community_rating NUMERIC,
  overall_safety_grade TEXT DEFAULT 'C',
  last_calculated TIMESTAMPTZ DEFAULT now()
);

-- Feature 11: Contaminant Encyclopedia & Emerging Research
CREATE TABLE public.contaminant_encyclopedia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  contaminant_type TEXT NOT NULL,
  description_html TEXT,
  sources_in_food TEXT,
  health_effects JSONB DEFAULT '[]'::jsonb,
  regulatory_limits JSONB DEFAULT '{}'::jsonb,
  exposure_reduction_tips TEXT,
  related_products JSONB DEFAULT '[]'::jsonb,
  key_studies JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.emerging_research (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contaminant_name TEXT NOT NULL,
  risk_level_current TEXT DEFAULT 'emerging',
  risk_trajectory TEXT DEFAULT 'increasing',
  latest_studies JSONB DEFAULT '[]'::jsonb,
  affected_products JSONB DEFAULT '[]'::jsonb,
  regulatory_actions_pending TEXT,
  kleen_recommendation TEXT,
  first_flagged_date DATE,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Feature 12: Kleen Safety Certification
CREATE TABLE public.kleen_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  brand_account_id UUID,
  tier TEXT DEFAULT 'bronze',
  application_date DATE,
  review_status TEXT DEFAULT 'pending',
  testing_results JSONB DEFAULT '{}'::jsonb,
  certification_date DATE,
  expiration_date DATE,
  annual_fee_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS policies for all new tables
ALTER TABLE public.microplastic_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.microplastic_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packaging_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packaging_risk_factors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_microplastic_risk ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processing_risk_factors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pfas_packaging_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pfas_water_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cookware_safety ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pfas_contamination_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_pfas_commitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.container_chemicals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_packaging_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storage_container_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mycotoxin_risk_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processing_contaminant_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cooking_safety_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pesticide_residue_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seafood_safety_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.residue_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.label_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_fraud_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_fraud_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.irradiation_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heavy_metal_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regional_contamination_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.total_exposure_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exposure_reduction_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_vulnerability_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recall_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_safety_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outbreak_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_safety_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contaminant_encyclopedia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emerging_research ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kleen_certifications ENABLE ROW LEVEL SECURITY;

-- Public read policies for reference/encyclopedia tables
CREATE POLICY "Public read microplastic_scores" ON public.microplastic_scores FOR SELECT USING (true);
CREATE POLICY "Public read microplastic_studies" ON public.microplastic_studies FOR SELECT USING (true);
CREATE POLICY "Public read packaging_materials" ON public.packaging_materials FOR SELECT USING (true);
CREATE POLICY "Public read packaging_risk_factors" ON public.packaging_risk_factors FOR SELECT USING (true);
CREATE POLICY "Public read category_microplastic_risk" ON public.category_microplastic_risk FOR SELECT USING (true);
CREATE POLICY "Public read processing_risk_factors" ON public.processing_risk_factors FOR SELECT USING (true);
CREATE POLICY "Public read pfas_packaging_data" ON public.pfas_packaging_data FOR SELECT USING (true);
CREATE POLICY "Public read pfas_water_data" ON public.pfas_water_data FOR SELECT USING (true);
CREATE POLICY "Public read cookware_safety" ON public.cookware_safety FOR SELECT USING (true);
CREATE POLICY "Public read pfas_contamination_sites" ON public.pfas_contamination_sites FOR SELECT USING (true);
CREATE POLICY "Public read brand_pfas_commitments" ON public.brand_pfas_commitments FOR SELECT USING (true);
CREATE POLICY "Public read container_chemicals" ON public.container_chemicals FOR SELECT USING (true);
CREATE POLICY "Public read product_packaging_analysis" ON public.product_packaging_analysis FOR SELECT USING (true);
CREATE POLICY "Public read storage_container_database" ON public.storage_container_database FOR SELECT USING (true);
CREATE POLICY "Public read mycotoxin_risk_profiles" ON public.mycotoxin_risk_profiles FOR SELECT USING (true);
CREATE POLICY "Public read processing_contaminant_scores" ON public.processing_contaminant_scores FOR SELECT USING (true);
CREATE POLICY "Public read cooking_safety_guides" ON public.cooking_safety_guides FOR SELECT USING (true);
CREATE POLICY "Public read pesticide_residue_data" ON public.pesticide_residue_data FOR SELECT USING (true);
CREATE POLICY "Public read seafood_safety_data" ON public.seafood_safety_data FOR SELECT USING (true);
CREATE POLICY "Public read residue_scores" ON public.residue_scores FOR SELECT USING (true);
CREATE POLICY "Public read label_claims" ON public.label_claims FOR SELECT USING (true);
CREATE POLICY "Public read food_fraud_scores" ON public.food_fraud_scores FOR SELECT USING (true);
CREATE POLICY "Public read food_fraud_incidents" ON public.food_fraud_incidents FOR SELECT USING (true);
CREATE POLICY "Public read irradiation_data" ON public.irradiation_data FOR SELECT USING (true);
CREATE POLICY "Public read heavy_metal_details" ON public.heavy_metal_details FOR SELECT USING (true);
CREATE POLICY "Public read regional_contamination_data" ON public.regional_contamination_data FOR SELECT USING (true);
CREATE POLICY "Public read recall_alerts" ON public.recall_alerts FOR SELECT USING (true);
CREATE POLICY "Public read food_safety_news" ON public.food_safety_news FOR SELECT USING (true);
CREATE POLICY "Public read outbreak_tracking" ON public.outbreak_tracking FOR SELECT USING (true);
CREATE POLICY "Public read brand_safety_scores" ON public.brand_safety_scores FOR SELECT USING (true);
CREATE POLICY "Public read contaminant_encyclopedia" ON public.contaminant_encyclopedia FOR SELECT USING (true);
CREATE POLICY "Public read emerging_research" ON public.emerging_research FOR SELECT USING (true);
CREATE POLICY "Public read kleen_certifications" ON public.kleen_certifications FOR SELECT USING (true);

-- User-owned tables need auth policies
CREATE POLICY "Users can view their exposure profiles" ON public.total_exposure_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create exposure profiles" ON public.total_exposure_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update exposure profiles" ON public.total_exposure_profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their reduction actions" ON public.exposure_reduction_actions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create reduction actions" ON public.exposure_reduction_actions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update reduction actions" ON public.exposure_reduction_actions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their vulnerability flags" ON public.user_vulnerability_flags FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create vulnerability flags" ON public.user_vulnerability_flags FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update vulnerability flags" ON public.user_vulnerability_flags FOR UPDATE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_microplastic_scores_product ON public.microplastic_scores(product_id);
CREATE INDEX idx_packaging_materials_product ON public.packaging_materials(product_id);
CREATE INDEX idx_mycotoxin_risk_product ON public.mycotoxin_risk_profiles(product_id);
CREATE INDEX idx_processing_contaminant_product ON public.processing_contaminant_scores(product_id);
CREATE INDEX idx_residue_scores_product ON public.residue_scores(product_id);
CREATE INDEX idx_food_fraud_scores_product ON public.food_fraud_scores(product_id);
CREATE INDEX idx_heavy_metal_details_product ON public.heavy_metal_details(product_id);
CREATE INDEX idx_total_exposure_user ON public.total_exposure_profiles(user_id);
CREATE INDEX idx_recall_alerts_date ON public.recall_alerts(recall_date);
CREATE INDEX idx_contaminant_encyclopedia_slug ON public.contaminant_encyclopedia(slug);
CREATE INDEX idx_pfas_water_zip ON public.pfas_water_data(zip_code);
